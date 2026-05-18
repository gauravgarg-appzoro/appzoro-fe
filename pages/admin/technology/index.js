import React from 'react';
import Link from 'next/link';
import { Button, Dropdown, Form } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import TechnologyTable from '../../../components/admin/technology/TechnologyTable';
import {   FaPlus, FaCog, FaFilter, FaChevronLeft, FaChevronRight   } from '../../../components/OptimizedIcons';

const TechnologyList = () => {
    return (
        <AdminLayout title="Technologies">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Technologies</h2>
                    <p className="text-secondary mb-0 small">4 entries found</p>
                </div>
                <Link href="/admin/technology/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" /> Add New Technologies
                    </Button>
                </Link>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    <Button variant="light" className="border d-flex align-items-center bg-white">
                        <FaFilter className="me-2 text-secondary" /> Filters
                    </Button>
                </div>
                <div>
                    <Button variant="link" className="text-secondary p-0">
                        <FaCog size={18} />
                    </Button>
                </div>
            </div>

            <TechnologyTable />

            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex align-items-center">
                    <Form.Select size="sm" className="me-2" style={{ width: '70px' }}>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </Form.Select>
                    <span className="text-secondary small">entries per page</span>
                </div>

                <div className="d-flex align-items-center">
                    <Button variant="white" className="border rounded-start p-2" disabled>
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <div className="d-flex border-top border-bottom">
                        <Button variant="primary" className="rounded-0 border-0 px-3 py-1">1</Button>
                    </div>
                    <Button variant="white" className="border rounded-end p-2" disabled>
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default TechnologyList;
