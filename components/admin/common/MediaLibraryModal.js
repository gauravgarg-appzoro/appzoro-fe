import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Nav, Tab, Row, Col, Spinner, Image } from 'react-bootstrap';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaCloudUploadAlt, FaCheck, FaSearch } from '../../OptimizedIcons';

const MediaLibraryModal = ({ show, onHide, onSelectImage }) => {
    const [activeTab, setActiveTab] = useState('library');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [altText, setAltText] = useState('');
    const [caption, setCaption] = useState('');
    const [imageLinkUrl, setImageLinkUrl] = useState('');
    const [imageLinkNoFollow, setImageLinkNoFollow] = useState(false);

    // Upload State
    const [uploadFile, setUploadFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (show && activeTab === 'library') {
            fetchImages();
        }
    }, [show, activeTab]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const result = await adminService.getUploadedFiles({ limit: 50, start: 0 }); // Todo: Pagination
            if (result.success) {
                setImages(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!uploadFile) return;
        setUploading(true);
        try {
            const result = await adminService.uploadImage(uploadFile);
            if (result.success) {
                // Determine URL
                const fileData = result.data;
                const url = fileData.url;
                // Note: Strapi returns relative URL usually. We need full URL for editor?
                // Actually RichTextEditor usually relies on relative if base is set, OR full.
                // Let's use full URL if possible, or construct it.
                // check if url starts with http
                const fullUrl = url.startsWith('http') ? url : `${STRAPI_IMAGE_BASE_URL}${url}`;

                // Select this image so user can add alt, caption, link and click Insert
                setSelectedImage({ ...fileData, fullUrl });
                setAltText(fileData.alternativeText || fileData.name || '');
                setCaption(fileData.caption || '');
                setImageLinkUrl('');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            // Show error toast?
        } finally {
            setUploading(false);
        }
    };

    const handleImageSelect = (img) => {
        const fullUrl = img.url.startsWith('http') ? img.url : `${STRAPI_IMAGE_BASE_URL}${img.url}`;
        setSelectedImage({ ...img, fullUrl });
        setAltText(img.alternativeText || img.name || '');
        setCaption(img.caption || '');
        setImageLinkUrl('');
    };

    const handleInsert = () => {
        if (selectedImage) {
            const linkUrl = imageLinkUrl.trim() || null;
            onSelectImage(selectedImage.fullUrl, altText, caption, linkUrl, linkUrl ? imageLinkNoFollow : false);
            handleClose();
        }
    };

    const handleClose = () => {
        setUploadFile(null);
        setPreviewUrl(null);
        setSelectedImage(null);
        setAltText('');
        setCaption('');
        setImageLinkUrl('');
        setImageLinkNoFollow(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Media Library</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <div className="border-bottom px-3 pt-3">
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="library">Library</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="upload">Upload New</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <Tab.Content className="p-3" style={{ minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
                        <Tab.Pane eventKey="library">
                            {loading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            ) : (
                                <>
                                    <Row className="g-3">
                                        {images.map((img) => {
                                            const fullUrl = img.url.startsWith('http') ? img.url : `${STRAPI_IMAGE_BASE_URL}${img.url}`;
                                            const isSelected = selectedImage?.id === img.id;
                                            return (
                                                <Col xs={6} md={3} key={img.id}>
                                                    <div
                                                        className={`position-relative border rounded overflow-hidden ${isSelected ? 'border-primary' : ''}`}
                                                        style={{ cursor: 'pointer', aspectRatio: '1/1', borderWidth: isSelected ? '3px' : '1px' }}
                                                        onClick={() => handleImageSelect(img)}
                                                    >
                                                        <Image
                                                            src={fullUrl}
                                                            alt={img.alternativeText || img.name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                        {isSelected && (
                                                            <div className="position-absolute top-0 end-0 bg-primary text-white p-1" style={{ borderRadius: '0 0 0 4px' }}>
                                                                <FaCheck size={12} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                        {images.length === 0 && (
                                            <div className="text-center w-100 py-5 text-muted">No images found.</div>
                                        )}
                                    </Row>
                                </>
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="upload">
                            <div className="d-flex flex-column align-items-center justify-content-center py-5 border border-dashed rounded bg-light" style={{ minHeight: '300px' }}>
                                {previewUrl ? (
                                    <div className="mb-3 text-center">
                                        <Image src={previewUrl} thumbnail style={{ maxHeight: '200px' }} />
                                        <div className="mt-2 text-muted">{uploadFile?.name}</div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted mb-3">
                                        <FaCloudUploadAlt size={48} className="mb-2" />
                                        <p>Click to select or drag and drop image here</p>
                                    </div>
                                )}

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
                                </Form.Group>

                                {previewUrl && (
                                    <Button variant="success" onClick={handleUpload} disabled={uploading}>
                                        {uploading ? (
                                            <>
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                Uploading...
                                            </>
                                        ) : (
                                            'Upload Helper & Insert'
                                        )}
                                    </Button>
                                )}
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer className="flex-column align-items-stretch gap-3">
                {(selectedImage && (activeTab === 'library' || activeTab === 'upload')) && (
                    <div className="d-flex flex-column gap-2 w-100">
                        <Form.Group className="mb-0">
                            <Form.Label className="small mb-1">Alt text (required for SEO)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Describe the image"
                                value={altText}
                                onChange={(e) => setAltText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-0">
                            <Form.Label className="small mb-1">Caption (optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Caption below image"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-0">
                            <Form.Label className="small mb-1">Image link URL (optional – makes image clickable)</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://..."
                                value={imageLinkUrl}
                                onChange={(e) => setImageLinkUrl(e.target.value)}
                            />
                            {imageLinkUrl.trim() && (
                                <div className="d-flex gap-3 mt-1">
                                    <Form.Check
                                        type="radio"
                                        id="img-link-dofollow"
                                        name="imageLinkFollow"
                                        label="Do follow"
                                        checked={!imageLinkNoFollow}
                                        onChange={() => setImageLinkNoFollow(false)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="img-link-nofollow"
                                        name="imageLinkFollow"
                                        label="No follow"
                                        checked={imageLinkNoFollow}
                                        onChange={() => setImageLinkNoFollow(true)}
                                    />
                                </div>
                            )}
                        </Form.Group>
                    </div>
                )}
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleInsert}
                        disabled={!selectedImage}
                    >
                        Insert
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default MediaLibraryModal;
