import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import adminService from '../../../services/admin.service';
import { FaCog, FaCheck } from '../../OptimizedIcons';

const IndustryNameForm = ({ initialData, isEdit }) => {
    const router = useRouter();
    const [name, setName] = useState(initialData?.name || '');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
        }
    }, [initialData]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.warning('Name is required');
            return;
        }
        setSaving(true);
        try {
            const payload = { name };
            let result;
            if (isEdit && initialData.id) {
                result = await adminService.updateIndustryName(initialData.id, payload);
            } else {
                result = await adminService.createIndustryName(payload);
            }

            if (result.success) {
                toast.success(isEdit ? 'Updated successfully!' : 'Created successfully!');
                window.location.href = '/admin/industry/industry-names';
                return;
            }
            toast.error(result.error || 'Failed to save');
            setSaving(false);
        } catch (error) {
            toast.error('An error occurred');
            setSaving(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <Form>
                <Row>
                    <Col md={8}>
                        <h4 className="fw-bold mb-4">Add new entry</h4>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold small text-secondary uppercase">NAME</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-light border-0"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="border-start">
                        <div className="ps-3">
                            <h5 className="fw-bold mb-3">Information</h5>
                            <div className="text-secondary small mb-3">
                                <p className="mb-1">Last update</p>
                                <p className="fw-bold text-dark">just now</p>
                            </div>
                            <div className="text-secondary small mb-3">
                                <p className="mb-1">By</p>
                                <p className="fw-bold text-dark">AppZoro Admin</p>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="fw-bold small text-secondary">STATE</span>
                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill small">
                                    <span className="dot bg-success rounded-circle d-inline-block me-2" style={{ width: 6, height: 6 }}></span>
                                    Published
                                </span>
                            </div>

                            <Button
                                variant="primary"
                                className="w-100 d-flex align-items-center justify-content-center mb-3"
                                onClick={handleSubmit}
                                disabled={saving}
                            >
                                {saving ? <Spinner size="sm" className="me-2" /> : <FaCheck className="me-2" size={12} />}
                                Save
                            </Button>

                            <div className="text-end mb-3">
                                <small className="text-secondary fst-italic">
                                    <span className="me-2">•</span> Editing draft version
                                </small>
                            </div>

                            {/* Links Section */}
                            <div className="border-top pt-3">
                                <Button variant="link" className="text-decoration-none text-dark p-0 d-block mb-2 w-100 text-start small">
                                    <FaCog className="me-2 text-secondary" /> Configure the view
                                </Button>
                                <Button variant="link" className="text-decoration-none text-dark p-0 d-block w-100 text-start small">
                                    <FaCog className="me-2 text-secondary" /> Edit the fields
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default IndustryNameForm;
