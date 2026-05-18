import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import CareerForm from '../../../components/admin/career/CareerForm';
import adminService from '../../../services/admin.service';
import { required } from '../../../lib/validation';
import {   FaArrowLeft   } from '../../../components/OptimizedIcons';

const CareerEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [careerData, setCareerData] = useState({});

    useEffect(() => {
        if (id && !isNew) {
            loadCareer(id);
        }
    }, [id]);

    const loadCareer = async (careerId) => {
        setLoading(true);
        try {
            const data = await adminService.getCareer(careerId);
            setCareerData(data || {});
        } catch (error) {
            toast.error('Failed to load career');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData, isDraft = false) => {
        const titleErr = required(formData.title, 'Job title');
        if (titleErr) {
            toast.error(titleErr);
            return;
        }
        setSaving(true);
        try {
            const published = !isDraft;
            const payload = {
                Title: formData.title,
                Experience: formData.experience,
                Details: formData.details,
                Responsibility: formData.responsibility,
                Requirements: formData.requirements,
                Published: published,
                published_at: published ? new Date().toISOString() : null,
            };

            let result;
            if (isNew) {
                result = await adminService.createCareer(payload);
            } else {
                result = await adminService.updateCareer(id, payload);
            }

            if (result.success) {
                toast.success(
                    isDraft ? 'Job saved as draft' : (isNew ? 'Career created successfully' : 'Career updated successfully')
                );
                window.location.href = '/admin/career';
                return;
            }
            toast.error(result.error || 'Failed to save career');
            setSaving(false);
        } catch (error) {
            toast.error('Failed to save career');
            console.error(error);
            setSaving(false);
        }
    };

    // Map backend fields to form fields
    const initialData = {
        title: careerData.Title || '',
        experience: careerData.Experience || '',
        details: careerData.Details || '',
        responsibility: careerData.Responsibility || '',
        published: !!careerData.published_at,
        requirements: careerData.Requirements || '',
    };

    return (
        <AdminLayout title={isNew ? 'Create an entry' : 'Edit Job Opening'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/career" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create an entry' : 'Edit Job Opening'}</h2>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <CareerForm initialData={initialData} onSave={handleSave} saving={saving} isNew={isNew} />
            )}
        </AdminLayout>
    );
};

export default CareerEdit;
