import React, { useState, useCallback } from 'react';
import { Button, Form, Row, Col, Collapse, Modal, Badge } from 'react-bootstrap';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaPlus, FaTrash, FaChevronDown, FaChevronRight } from '../OptimizedIcons';
import { getAllBlocks, getBlockCategories } from '../page-builder/blockRegistry';
import adminService from '../../services/admin.service';

function generateBlockId() {
    return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function SortableBlockItem({ block, index, blockMeta, collapsed, onToggle, onRemove, onUpdateProps }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
    };

    const meta = blockMeta || {};
    const propFields = block.props ? Object.keys(block.props) : [];
    const schema = Array.isArray(meta.propsSchema) ? meta.propsSchema : null;
    const [uploadingKey, setUploadingKey] = useState('');

    const uploadImage = async (propKey, file, arrayIndex = null, itemKey = null) => {
        if (!file) return;
        try {
            setUploadingKey(`${propKey}-${arrayIndex ?? 'root'}-${itemKey ?? ''}`);
            const result = await adminService.uploadImage(file);
            if (result?.success && result?.data?.url) {
                const url = result.data.url;
                if (arrayIndex != null && itemKey) {
                    const arr = Array.isArray(block.props[propKey]) ? [...block.props[propKey]] : [];
                    arr[arrayIndex] = { ...(arr[arrayIndex] || {}), [itemKey]: url };
                    onUpdateProps(index, propKey, arr);
                } else {
                    onUpdateProps(index, propKey, url);
                }
            }
        } finally {
            setUploadingKey('');
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-2 bg-white border rounded">
            <div
                className="d-flex align-items-center justify-content-between p-2 border-bottom"
                style={{ cursor: 'grab' }}
            >
                <div className="d-flex align-items-center gap-2">
                    <span {...attributes} {...listeners} className="text-muted" style={{ cursor: 'grab' }}>
                        &#x2630;
                    </span>
                    {collapsed ? <FaChevronRight size={10} /> : <FaChevronDown size={10} />}
                    <span className="small fw-bold" onClick={() => onToggle(index)} style={{ cursor: 'pointer' }}>
                        {meta.label || block.type}
                    </span>
                    <Badge bg="secondary" className="ms-1" style={{ fontSize: '10px' }}>{block.type}</Badge>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">#{index + 1}</span>
                    <Button variant="link" className="text-danger p-0" onClick={() => onRemove(index)} title="Remove block">
                        <FaTrash size={12} />
                    </Button>
                </div>
            </div>
            <Collapse in={!collapsed}>
                <div className="p-3">
                    {blockMeta?.entityAware && (
                        <div className="alert alert-light border small mb-3 py-2">
                            {blockMeta.entityHint
                                || 'This block pulls content from the main form fields above (same as the legacy page). Use those fields to edit—no duplicate JSON here.'}
                        </div>
                    )}
                    {schema ? (
                        <Row>
                            {schema.map((field) => {
                                const value = block.props?.[field.key];
                                if (field.type === 'boolean') {
                                    return (
                                        <Col xs={12} key={field.key}>
                                            <Form.Check
                                                type="switch"
                                                id={`${block.id}-${field.key}`}
                                                label={field.label}
                                                checked={!!value}
                                                onChange={(e) => onUpdateProps(index, field.key, e.target.checked)}
                                                className="mb-2"
                                            />
                                        </Col>
                                    );
                                }
                                if (field.type === 'json') {
                                    const jsonStr = (() => {
                                        if (value === undefined || value === null) return JSON.stringify(field.defaultJson ?? {}, null, 2);
                                        if (typeof value === 'string') {
                                            try {
                                                return JSON.stringify(JSON.parse(value), null, 2);
                                            } catch {
                                                return value;
                                            }
                                        }
                                        return JSON.stringify(value, null, 2);
                                    })();
                                    return (
                                        <Col xs={12} key={field.key}>
                                            <Form.Label className="small mb-1">{field.label}</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={field.rows || 8}
                                                value={jsonStr}
                                                onChange={(e) => {
                                                    try {
                                                        const parsed = JSON.parse(e.target.value);
                                                        onUpdateProps(index, field.key, parsed);
                                                    } catch {
                                                        /* allow partial edit */
                                                    }
                                                }}
                                                className="font-monospace"
                                                style={{ fontSize: '12px' }}
                                            />
                                            {field.helpText && (
                                                <Form.Text className="text-muted d-block">{field.helpText}</Form.Text>
                                            )}
                                        </Col>
                                    );
                                }
                                if (field.type === 'array') {
                                    const items = Array.isArray(value) ? value : [];
                                    return (
                                        <Col xs={12} key={field.key}>
                                            <Form.Group className="mb-3">
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <Form.Label className="small mb-0">{field.label}</Form.Label>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-primary"
                                                        onClick={() => onUpdateProps(index, field.key, [...items, {}])}
                                                    >
                                                        Add {field.itemLabel || 'Item'}
                                                    </Button>
                                                </div>
                                                {items.map((item, itemIdx) => (
                                                    <div key={`${field.key}-${itemIdx}`} className="border rounded p-2 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <small className="text-muted">{field.itemLabel || 'Item'} #{itemIdx + 1}</small>
                                                            <Button
                                                                size="sm"
                                                                variant="link"
                                                                className="text-danger p-0"
                                                                onClick={() => onUpdateProps(index, field.key, items.filter((_, i) => i !== itemIdx))}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <Row>
                                                            {(field.itemFields || []).map((itemField) => {
                                                                const itemVal = item?.[itemField.key] ?? '';
                                                                if (itemField.type === 'image') {
                                                                    return (
                                                                        <Col md={6} key={`${field.key}-${itemIdx}-${itemField.key}`}>
                                                                            <Form.Label className="small mb-1">{itemField.label}</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={itemVal}
                                                                                onChange={(e) => {
                                                                                    const next = [...items];
                                                                                    next[itemIdx] = { ...(next[itemIdx] || {}), [itemField.key]: e.target.value };
                                                                                    onUpdateProps(index, field.key, next);
                                                                                }}
                                                                            />
                                                                            <Form.Control
                                                                                type="file"
                                                                                className="mt-1"
                                                                                accept="image/*"
                                                                                onChange={(e) => uploadImage(field.key, e.target.files?.[0], itemIdx, itemField.key)}
                                                                            />
                                                                            {uploadingKey === `${field.key}-${itemIdx}-${itemField.key}` && <small className="text-muted">Uploading...</small>}
                                                                        </Col>
                                                                    );
                                                                }
                                                                return (
                                                                    <Col md={itemField.type === 'textarea' ? 12 : 6} key={`${field.key}-${itemIdx}-${itemField.key}`}>
                                                                        <Form.Label className="small mb-1">{itemField.label}</Form.Label>
                                                                        <Form.Control
                                                                            as={itemField.type === 'textarea' ? 'textarea' : 'input'}
                                                                            rows={itemField.type === 'textarea' ? 3 : undefined}
                                                                            type={itemField.type === 'url' ? 'url' : 'text'}
                                                                            value={itemVal}
                                                                            onChange={(e) => {
                                                                                const next = [...items];
                                                                                next[itemIdx] = { ...(next[itemIdx] || {}), [itemField.key]: e.target.value };
                                                                                onUpdateProps(index, field.key, next);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                );
                                                            })}
                                                        </Row>
                                                    </div>
                                                ))}
                                                {field.helpText && (
                                                    <Form.Text className="text-muted d-block">{field.helpText}</Form.Text>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    );
                                }
                                if (field.type === 'textarea') {
                                    return (
                                        <Col xs={12} key={field.key}>
                                            <Form.Label className="small mb-1">{field.label}</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={value ?? ''}
                                                onChange={(e) => onUpdateProps(index, field.key, e.target.value)}
                                            />
                                            {field.helpText && (
                                                <Form.Text className="text-muted d-block">{field.helpText}</Form.Text>
                                            )}
                                        </Col>
                                    );
                                }
                                if (field.type === 'image') {
                                    return (
                                        <Col md={6} key={field.key}>
                                            <Form.Label className="small mb-1">{field.label}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={value ?? ''}
                                                onChange={(e) => onUpdateProps(index, field.key, e.target.value)}
                                            />
                                            <Form.Control
                                                type="file"
                                                className="mt-1"
                                                accept="image/*"
                                                onChange={(e) => uploadImage(field.key, e.target.files?.[0])}
                                            />
                                            {uploadingKey === `${field.key}-root-` && <small className="text-muted">Uploading...</small>}
                                            {field.helpText && (
                                                <Form.Text className="text-muted d-block">{field.helpText}</Form.Text>
                                            )}
                                        </Col>
                                    );
                                }
                                return (
                                    <Col md={field.type === 'url' ? 12 : 6} key={field.key}>
                                        <Form.Label className="small mb-1">{field.label}</Form.Label>
                                        <Form.Control
                                            type={field.type === 'url' ? 'url' : 'text'}
                                            value={value ?? ''}
                                            onChange={(e) => onUpdateProps(index, field.key, e.target.value)}
                                        />
                                        {field.helpText && (
                                            <Form.Text className="text-muted d-block">{field.helpText}</Form.Text>
                                        )}
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : propFields.length === 0 ? (
                        blockMeta?.entityAware ? null : (
                            <p className="text-muted small mb-0">This block has no configurable props — it uses shared data.</p>
                        )
                    ) : (
                        <Row>
                            {propFields.map((propKey) => {
                                const val = block.props[propKey];
                                if (Array.isArray(val)) {
                                    return (
                                        <Col xs={12} key={propKey}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="small mb-1 text-capitalize">{propKey}</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={JSON.stringify(val, null, 2)}
                                                    onChange={(e) => {
                                                        try {
                                                            const parsed = JSON.parse(e.target.value);
                                                            // If this prop is an array, normalize accidental object input into single-item array.
                                                            if (Array.isArray(val) && parsed && !Array.isArray(parsed) && typeof parsed === 'object') {
                                                                onUpdateProps(index, propKey, [parsed]);
                                                                return;
                                                            }
                                                            onUpdateProps(index, propKey, parsed);
                                                        } catch { /* ignore partial JSON */ }
                                                    }}
                                                    className="font-monospace"
                                                    style={{ fontSize: '12px' }}
                                                />
                                                {propKey === 'cards' && (
                                                    <Form.Text className="text-muted">
                                                        Use array format, e.g. [{'{'}"title":"Card title","description":"Card description"{'}'}]
                                                    </Form.Text>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    );
                                }
                                if (typeof val === 'string' && val.length > 80) {
                                    return (
                                        <Col xs={12} key={propKey}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="small mb-1 text-capitalize">{propKey}</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={val}
                                                    onChange={(e) => onUpdateProps(index, propKey, e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    );
                                }
                                return (
                                    <Col md={6} key={propKey}>
                                        <Form.Group className="mb-2">
                                            <Form.Label className="small mb-1 text-capitalize">{propKey}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={val ?? ''}
                                                onChange={(e) => onUpdateProps(index, propKey, e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                </div>
            </Collapse>
        </div>
    );
}

export default function PageBuilder({ blocks = [], onChange }) {
    const [collapsed, setCollapsed] = useState({});
    const [showPicker, setShowPicker] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const blockMetas = {};
    getAllBlocks().forEach((b) => { blockMetas[b.type] = b; });

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIdx = blocks.findIndex((b) => b.id === active.id);
        const newIdx = blocks.findIndex((b) => b.id === over.id);
        if (oldIdx === -1 || newIdx === -1) return;
        onChange(arrayMove(blocks, oldIdx, newIdx));
    }, [blocks, onChange]);

    const addBlock = (type) => {
        const meta = blockMetas[type];
        const newBlock = {
            id: generateBlockId(),
            type,
            props: meta?.defaultProps ? { ...meta.defaultProps } : {},
        };
        onChange([...blocks, newBlock]);
        setShowPicker(false);
    };

    const removeBlock = (idx) => {
        onChange(blocks.filter((_, i) => i !== idx));
    };

    const updateBlockProps = (idx, propKey, value) => {
        const updated = [...blocks];
        updated[idx] = { ...updated[idx], props: { ...updated[idx].props, [propKey]: value } };
        onChange(updated);
    };

    const toggleCollapse = (idx) => {
        setCollapsed((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    const categories = getBlockCategories();

    return (
        <div className="page-builder-admin">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Page Blocks ({blocks.length})</h6>
                <Button variant="outline-primary" size="sm" onClick={() => setShowPicker(true)}>
                    <FaPlus size={10} className="me-1" /> Add Block
                </Button>
            </div>

            {blocks.length === 0 ? (
                <div className="text-center py-4 bg-light rounded border" style={{ border: '2px dashed #dee2e6' }}>
                    <p className="text-muted mb-2">No page blocks yet.</p>
                    <Button variant="primary" size="sm" onClick={() => setShowPicker(true)}>
                        <FaPlus size={10} className="me-1" /> Add your first block
                    </Button>
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block, idx) => (
                            <SortableBlockItem
                                key={block.id}
                                block={block}
                                index={idx}
                                blockMeta={blockMetas[block.type]}
                                collapsed={!!collapsed[idx]}
                                onToggle={toggleCollapse}
                                onRemove={removeBlock}
                                onUpdateProps={updateBlockProps}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            )}

            {/* Block Picker Modal */}
            <Modal show={showPicker} onHide={() => setShowPicker(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="h6">Add a Block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.entries(categories).map(([cat, items]) => (
                        <div key={cat} className="mb-3">
                            <h6 className="text-muted small fw-bold text-uppercase mb-2">{cat}</h6>
                            <Row>
                                {items.map((item) => (
                                    <Col xs={6} md={4} key={item.type} className="mb-2">
                                        <div
                                            className="border rounded p-3 text-center h-100"
                                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                                            onClick={() => addBlock(item.type)}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0d6efd'; e.currentTarget.style.background = '#f0f6ff'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#dee2e6'; e.currentTarget.style.background = ''; }}
                                        >
                                            <div className="fw-bold small">{item.label}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
}
