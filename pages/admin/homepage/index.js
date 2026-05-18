import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col, Collapse, Image, Dropdown, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import dynamic from 'next/dynamic';
import {   FaSave, FaPlus, FaTrash, FaUndo, FaChevronDown, FaChevronRight, FaGripLines, FaCloudUploadAlt, FaPen   } from '../../../components/OptimizedIcons';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/common/RichTextEditor'),
    { ssr: false }
);

// Custom Toggle for Dropdown to hide caret and style as link
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        variant="link"
        className="text-secondary p-0 border-0"
    >
        {children}
    </Button>
));
CustomToggle.displayName = 'CustomToggle';

const ImageUpload = ({ preview, onUpload, onRemove, label, onEdit }) => (
    <div className="mb-4">
        <Form.Label className="text-dark fw-bold small mb-2">{label}</Form.Label>
        {preview ? (
            <div className="position-relative mb-3 bg-dark rounded border" style={{ maxWidth: '100%', height: '200px' }}>
                <Image src={preview} fluid className="w-100 h-100" style={{ objectFit: 'contain' }} />
                <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                    {onEdit && (
                        <Button variant="light" size="sm" className="border shadow-sm" onClick={onEdit} title="Edit Details">
                            <FaPen size={12} />
                        </Button>
                    )}
                    <Button variant="light" size="sm" className="border shadow-sm" onClick={onRemove} title="Remove">
                        <FaTrash size={12} />
                    </Button>
                </div>
            </div>
        ) : (
            <div className="border bg-light d-flex align-items-center justify-content-center rounded" style={{ height: '200px', cursor: 'pointer', position: 'relative' }}>
                <div className="text-center text-secondary">
                    <FaCloudUploadAlt size={40} className="mb-3" />
                    <div className="small">Click to select an asset or</div>
                    <div className="small">drag & drop a file in this area</div>
                </div>
                <Form.Control type="file" accept="image/*" onChange={onUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
            </div>
        )}
    </div>
);

const HomepageAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        // Hero
        hero_title: 'Mobile App Development Atlanta',
        hero_subtitles: [],
        hero_links: [],

        // About
        about_title: '',
        about_details: '',

        // Awards
        awards_title: '',
        awards_list: [],

        // Press
        press_title: '',
        press_list: [],

        // Testimonials
        testimonials_title: '',
        testimonials_list: [],

        // Home Content
        home_content_title: '',
        home_content_details: '',

        // Video
        homepage_video_link: '',

        // SEO
        slug: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_robots: 'index, follow',
        og_title: '',
        og_description: '',
        og_image: null,
        twitter_title: '',
        twitter_description: '',
        twitter_image: null,
        schema_code: ''
    });

    const [collapsedItems, setCollapsedItems] = useState({
        hero: false,
        about: true,
        awards: true,
        press: true,
        testimonials: true,
        homeContent: true,
        homepageVideo: true,
        seo: true
    });

    // Preview state
    const [imagePreviews, setImagePreviews] = useState({});

    // Fetch data on Load
    useEffect(() => {
        fetchHomepageData();
    }, []);

    const fetchHomepageData = async () => {
        setLoading(true);
        try {
            const response = await adminService.getHomepage();
            let data = null;

            if (response && (response._id || response.id || response.hero)) {
                data = response;
            } else if (response && response.data) {
                data = response.data;
            }

            if (data) {
                // Map backend data to form state
                setFormData({
                    // Hero
                    hero_title: data.hero?.title || '',
                    hero_subtitles: data.hero?.subtitles || [],
                    hero_links: data.hero?.links || [],

                    // About
                    about_title: data.AboutAppzoro?.title || '',
                    about_details: data.AboutAppzoro?.details || '',

                    // Awards
                    awards_title: data.awards?.title || '',
                    awards_list: data.awards?.list?.map(item => ({
                        ...item,
                        image: item.image ? item.image._id || item.image : null // Ensure ID is used
                    })) || [],

                    // Press
                    press_title: data.pressCarousel?.title || '',
                    press_list: data.pressCarousel?.list?.map(item => ({
                        ...item,
                        image: item.image ? item.image._id || item.image : null
                    })) || [],

                    // Testimonials
                    testimonials_title: data.testimonials?.title || '',
                    testimonials_list: data.testimonials?.list?.map(item => ({
                        ...item,
                        image: item.image ? item.image._id || item.image : null
                    })) || [],

                    // Home Content - if stored in hero or separate
                    home_content_title: data.hero?.content_title || '',
                    home_content_details: data.hero?.content_details || '',

                    homepage_video_link: data.hero?.video_link || '',

                    // SEO
                    slug: data.seo?.slug || '',
                    seo_title: data.seo?.seoTitle || '',
                    seo_description: data.seo?.seoDescription || '',
                    seo_keywords: data.seo?.keywords || '',
                    seo_robots: data.seo?.robots || 'index, follow',
                    og_title: data.seo?.ogTitle || '',
                    og_description: data.seo?.ogDescription || '',
                    og_image: data.seo?.ogImage ? data.seo.ogImage._id || data.seo.ogImage : null,
                    twitter_title: data.seo?.twitterTitle || '',
                    twitter_description: data.seo?.twitterDescription || '',
                    twitter_image: data.seo?.twitterImage ? data.seo.twitterImage._id || data.seo.twitterImage : null,
                    schema_code: data.seo?.schemaCode || ''
                });

                // Set Previews
                const newPreviews = {};
                // Awards Previews
                if (data.awards?.list) {
                    data.awards.list.forEach((item, idx) => {
                        if (item.image && item.image.url) {
                            newPreviews[`award-${idx}`] = `${STRAPI_IMAGE_BASE_URL}${item.image.url}`;
                        }
                    });
                }
                // Press Previews
                if (data.pressCarousel?.list) {
                    data.pressCarousel.list.forEach((item, idx) => {
                        if (item.image && item.image.url) {
                            newPreviews[`press-${idx}`] = `${STRAPI_IMAGE_BASE_URL}${item.image.url}`;
                        }
                    });
                }
                // Testimonials Previews
                if (data.testimonials?.list) {
                    data.testimonials.list.forEach((item, idx) => {
                        if (item.image && item.image.url) {
                            newPreviews[`testimonial-${idx}`] = `${STRAPI_IMAGE_BASE_URL}${item.image.url}`;
                        }
                    });
                }
                // SEO Previews
                if (data.seo?.ogImage?.url) newPreviews['og_image'] = `${STRAPI_IMAGE_BASE_URL}${data.seo.ogImage.url}`;
                if (data.seo?.twitterImage?.url) newPreviews['twitter_image'] = `${STRAPI_IMAGE_BASE_URL}${data.seo.twitterImage.url}`;

                setImagePreviews(newPreviews);
            }
        } catch (error) {
            toast.error('Failed to load homepage data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Construct payload matching backend entity structure
            const payload = {
                hero: {
                    title: formData.hero_title,
                    subtitles: formData.hero_subtitles,
                    links: formData.hero_links,
                    content_title: formData.home_content_title,
                    content_details: formData.home_content_details,
                    video_link: formData.homepage_video_link
                },
                AboutAppzoro: {
                    title: formData.about_title,
                    details: formData.about_details
                },
                awards: {
                    title: formData.awards_title,
                    list: formData.awards_list
                },
                pressCarousel: {
                    title: formData.press_title,
                    list: formData.press_list
                },
                testimonials: {
                    title: formData.testimonials_title,
                    list: formData.testimonials_list
                },
                seo: {
                    slug: formData.slug,
                    seoTitle: formData.seo_title,
                    seoDescription: formData.seo_description,
                    keywords: formData.seo_keywords,
                    robots: formData.seo_robots,
                    ogTitle: formData.og_title,
                    ogDescription: formData.og_description,
                    ogImage: formData.og_image,
                    twitterTitle: formData.twitter_title,
                    twitterDescription: formData.twitter_description,
                    twitterImage: formData.twitter_image,
                    schemaCode: formData.schema_code
                }
            };

            await adminService.updateHomepage(payload);
            toast.success('Homepage updated successfully');
        } catch (error) {
            toast.error('Failed to update homepage');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    // Generic Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (field, content) => {
        setFormData(prev => ({ ...prev, [field]: content }));
    };

    // Subtitles
    const addSubtitle = () => setFormData(p => ({ ...p, hero_subtitles: [...p.hero_subtitles, ''] }));
    const removeSubtitle = (idx) => setFormData(p => ({ ...p, hero_subtitles: p.hero_subtitles.filter((_, i) => i !== idx) }));
    const updateSubtitle = (idx, val) => {
        const updated = [...formData.hero_subtitles];
        updated[idx] = val;
        setFormData(p => ({ ...p, hero_subtitles: updated }));
    };

    // Links
    const addLink = () => setFormData(p => ({ ...p, hero_links: [...p.hero_links, { title: '', url: '' }] }));
    const removeLink = (idx) => setFormData(p => ({ ...p, hero_links: p.hero_links.filter((_, i) => i !== idx) }));
    const updateLink = (idx, field, val) => {
        const updated = [...formData.hero_links];
        updated[idx] = { ...updated[idx], [field]: val };
        setFormData(p => ({ ...p, hero_links: updated }));
    };

    // Generic Image Upload
    const handleImageUpload = async (file) => {
        const result = await adminService.uploadImage(file);
        if (result.success) return result.data;
        throw new Error('Upload failed');
    };

    // List Image Handlers
    const handleListImageUpload = async (listName, index, file, previewKey) => {
        if (!file) return;
        // Preview
        const reader = new FileReader();
        reader.onloadend = () => setImagePreviews(prev => ({ ...prev, [previewKey]: reader.result }));
        reader.readAsDataURL(file);

        try {
            const uploaded = await handleImageUpload(file);
            const updatedList = [...formData[listName]];
            updatedList[index].image = uploaded.id || uploaded._id;
            setFormData(prev => ({ ...prev, [listName]: updatedList }));
            toast.success('Image uploaded');
        } catch (err) {
            toast.error('Image upload failed');
        }
    };

    // Awards
    const addAward = () => setFormData(p => ({ ...p, awards_list: [...p.awards_list, { image: null, url: '', seo_text: '' }] }));
    const removeAward = (idx) => setFormData(p => ({ ...p, awards_list: p.awards_list.filter((_, i) => i !== idx) }));
    const updateAward = (idx, field, val) => {
        const updated = [...formData.awards_list];
        updated[idx] = { ...updated[idx], [field]: val };
        setFormData(p => ({ ...p, awards_list: updated }));
    };

    // Press
    const addPress = () => setFormData(p => ({ ...p, press_list: [...p.press_list, { image: null, url: '', seo_text: '' }] }));
    const removePress = (idx) => setFormData(p => ({ ...p, press_list: p.press_list.filter((_, i) => i !== idx) }));
    const updatePress = (idx, field, val) => {
        const updated = [...formData.press_list];
        updated[idx] = { ...updated[idx], [field]: val };
        setFormData(p => ({ ...p, press_list: updated }));
    };

    // Testimonials
    const addTestimonial = () => setFormData(p => ({ ...p, testimonials_list: [...p.testimonials_list, { image: null, name: '', designation: '', testimonial: '', link: '' }] }));
    const removeTestimonial = (idx) => setFormData(p => ({ ...p, testimonials_list: p.testimonials_list.filter((_, i) => i !== idx) }));
    const updateTestimonial = (idx, field, val) => {
        const updated = [...formData.testimonials_list];
        updated[idx] = { ...updated[idx], [field]: val };
        setFormData(p => ({ ...p, testimonials_list: updated }));
    };

    // SEO Images
    const handleSEOImageUpload = async (field, file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImagePreviews(prev => ({ ...prev, [field]: reader.result }));
        reader.readAsDataURL(file);

        try {
            const uploaded = await handleImageUpload(file);
            setFormData(prev => ({ ...prev, [field]: uploaded.id || uploaded._id }));
            toast.success(`${field} uploaded`);
        } catch (err) {
            toast.error('Upload failed');
        }
    };

    const toggleCollapse = (key) => setCollapsedItems(p => ({ ...p, [key]: !p[key] }));

    if (loading) return <AdminLayout title="Homepage"><div className="text-center py-5"><Spinner animation="border" /></div></AdminLayout>;

    return (
        <AdminLayout title="Homepage Management">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold mb-0">Homepage Management</h2>
                <Button variant="primary" onClick={handleSave} disabled={saving}>
                    {saving ? <Spinner size="sm" /> : <><FaSave className="me-2" /> Save Changes</>}
                </Button>
            </div>

            <Row>
                <Col md={12}>
                    {/* HERO SECTION */}
                    <Card className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between" onClick={() => toggleCollapse('hero')} style={{ cursor: 'pointer' }}>
                            <h5 className="mb-0 fw-bold">Hero Section</h5>
                            <Button variant="link" className="p-0"><FaChevronDown /></Button>
                        </div>
                        <Collapse in={!collapsedItems.hero}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hero Title</Form.Label>
                                    <Form.Control type="text" name="hero_title" value={formData.hero_title} onChange={handleChange} />
                                </Form.Group>

                                <div className="mb-3">
                                    <Form.Label className="fw-bold">Subtitles</Form.Label>
                                    {formData.hero_subtitles.map((sub, idx) => (
                                        <div key={idx} className="d-flex mb-2">
                                            <Form.Control type="text" value={sub} onChange={(e) => updateSubtitle(idx, e.target.value)} />
                                            <Button variant="outline-danger" className="ms-2" onClick={() => removeSubtitle(idx)}><FaTrash /></Button>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" onClick={addSubtitle}><FaPlus className="me-1" /> Add Subtitle</Button>
                                </div>

                                <div className="mb-3">
                                    <Form.Label className="fw-bold">Action Links</Form.Label>
                                    {formData.hero_links.map((link, idx) => (
                                        <div key={idx} className="d-flex mb-2 gap-2">
                                            <Form.Control placeholder="Label" value={link.title} onChange={(e) => updateLink(idx, 'title', e.target.value)} />
                                            <Form.Control placeholder="URL" value={link.url} onChange={(e) => updateLink(idx, 'url', e.target.value)} />
                                            <Button variant="outline-danger" onClick={() => removeLink(idx)}><FaTrash /></Button>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" onClick={addLink}><FaPlus className="me-1" /> Add Link</Button>
                                </div>
                            </Card.Body>
                        </Collapse>
                    </Card>

                    {/* ABOUT SECTION */}
                    <Card className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between" onClick={() => toggleCollapse('about')} style={{ cursor: 'pointer' }}>
                            <h5 className="mb-0 fw-bold">About Appzoro</h5>
                            <Button variant="link" className="p-0"><FaChevronDown /></Button>
                        </div>
                        <Collapse in={!collapsedItems.about}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="about_title" value={formData.about_title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Details</Form.Label>
                                    <div className="border rounded">
                                        <RichTextEditor content={formData.about_details} onChange={(c) => handleEditorChange('about_details', c)} />
                                    </div>
                                </Form.Group>
                            </Card.Body>
                        </Collapse>
                    </Card>

                    {/* AWARDS SECTION */}
                    <Card className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between" onClick={() => toggleCollapse('awards')} style={{ cursor: 'pointer' }}>
                            <h5 className="mb-0 fw-bold">Awards</h5>
                            <Button variant="link" className="p-0"><FaChevronDown /></Button>
                        </div>
                        <Collapse in={!collapsedItems.awards}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Section Title</Form.Label>
                                    <Form.Control type="text" name="awards_title" value={formData.awards_title} onChange={handleChange} />
                                </Form.Group>
                                {formData.awards_list.map((item, idx) => (
                                    <Card key={idx} className="mb-3 bg-light">
                                        <Card.Body>
                                            <div className="d-flex justify-content-end mb-2">
                                                <Button variant="danger" size="sm" onClick={() => removeAward(idx)}><FaTrash /></Button>
                                            </div>
                                            <Row>
                                                <Col md={4}>
                                                    <ImageUpload
                                                        preview={imagePreviews[`award-${idx}`]}
                                                        label="Award Image"
                                                        onUpload={(e) => handleListImageUpload('awards_list', idx, e.target.files[0], `award-${idx}`)}
                                                        onRemove={() => { }}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>URL</Form.Label>
                                                        <Form.Control type="text" value={item.url} onChange={(e) => updateAward(idx, 'url', e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>Alt Text</Form.Label>
                                                        <Form.Control type="text" value={item.seo_text} onChange={(e) => updateAward(idx, 'seo_text', e.target.value)} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <Button variant="outline-primary" onClick={addAward}><FaPlus className="me-2" /> Add Award</Button>
                            </Card.Body>
                        </Collapse>
                    </Card>

                    {/* TESTIMONIALS SECTION */}
                    <Card className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between" onClick={() => toggleCollapse('testimonials')} style={{ cursor: 'pointer' }}>
                            <h5 className="mb-0 fw-bold">Testimonials</h5>
                            <Button variant="link" className="p-0"><FaChevronDown /></Button>
                        </div>
                        <Collapse in={!collapsedItems.testimonials}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Section Title</Form.Label>
                                    <Form.Control type="text" name="testimonials_title" value={formData.testimonials_title} onChange={handleChange} />
                                </Form.Group>
                                {formData.testimonials_list.map((item, idx) => (
                                    <Card key={idx} className="mb-3 bg-light">
                                        <Card.Body>
                                            <div className="d-flex justify-content-end mb-2">
                                                <Button variant="danger" size="sm" onClick={() => removeTestimonial(idx)}><FaTrash /></Button>
                                            </div>
                                            <Row>
                                                <Col md={3}>
                                                    <ImageUpload
                                                        preview={imagePreviews[`testimonial-${idx}`]}
                                                        label="Client Photo"
                                                        onUpload={(e) => handleListImageUpload('testimonials_list', idx, e.target.files[0], `testimonial-${idx}`)}
                                                        onRemove={() => { }}
                                                    />
                                                </Col>
                                                <Col md={9}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2">
                                                                <Form.Control placeholder="Name" value={item.name} onChange={(e) => updateTestimonial(idx, 'name', e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2">
                                                                <Form.Control placeholder="Designation" value={item.designation} onChange={(e) => updateTestimonial(idx, 'designation', e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group className="mb-2">
                                                                <Form.Control as="textarea" rows={3} placeholder="Testimonial Text" value={item.testimonial} onChange={(e) => updateTestimonial(idx, 'testimonial', e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <Button variant="outline-primary" onClick={addTestimonial}><FaPlus className="me-2" /> Add Testimonial</Button>
                            </Card.Body>
                        </Collapse>
                    </Card>

                    {/* SEO SECTION */}
                    <Card className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between" onClick={() => toggleCollapse('seo')} style={{ cursor: 'pointer' }}>
                            <h5 className="mb-0 fw-bold">SEO & Social</h5>
                            <Button variant="link" className="p-0"><FaChevronDown /></Button>
                        </div>
                        <Collapse in={!collapsedItems.seo}>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Page Slug</Form.Label>
                                            <Form.Control type="text" name="slug" value={formData.slug} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>SEO Title</Form.Label>
                                            <Form.Control type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>SEO Description</Form.Label>
                                            <Form.Control as="textarea" rows={2} name="seo_description" value={formData.seo_description} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <ImageUpload
                                            preview={imagePreviews['og_image']}
                                            label="OG Image"
                                            onUpload={(e) => handleSEOImageUpload('og_image', e.target.files[0])}
                                            onRemove={() => { }}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Collapse>
                    </Card>

                </Col>
            </Row>
        </AdminLayout>
    );
};

export default HomepageAdmin;
