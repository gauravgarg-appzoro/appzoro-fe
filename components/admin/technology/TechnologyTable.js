import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { FaEdit, FaTrash, FaCopy } from '../../OptimizedIcons';

const TechnologyTable = () => {
    // Mock Data based on screenshot
    const technologies = [
        { id: '662631b646f2d02ab0be05...', title: 'Flutter', banner: '/assets/images/technology/flutter.png', slug: 'flutter', state: 'Published' },
        { id: '662632d146f2d02ab0be05...', title: 'Java', banner: '/assets/images/technology/java.png', slug: 'java', state: 'Published' },
        { id: '66225780bae07b7a79682...', title: 'React js', banner: '/assets/images/technology/react.png', slug: 'react', state: 'Published' },
        { id: '662630f646f2d02ab0be05...', title: 'React native', banner: '/assets/images/technology/react-native.png', slug: 'react-native', state: 'Published' },
    ];

    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>
                        <th className="py-3 ps-3" style={{ width: '40px' }}>
                            <Form.Check type="checkbox" />
                        </th>
                        <th className="border-0 py-3 fw-bold">Id</th>
                        <th className="border-0 py-3 fw-bold">Title</th>
                        <th className="border-0 py-3 text-secondary text-uppercase small fw-bold">TechBanner</th>
                        <th className="border-0 py-3 text-secondary text-uppercase small fw-bold">Slug</th>
                        <th className="border-0 py-3 fw-bold">State</th>
                        <th className="border-0 py-3 text-end fw-bold pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {technologies.map((tech, idx) => (
                        <tr key={idx}>
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td className="text-secondary small font-monospace">{tech.id}</td>
                            <td className="fw-medium text-dark">{tech.title}</td>
                            <td>
                                <div className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center bg-light" style={{ width: '32px', height: '32px' }}>
                                    {/* Using placeholder div or img if available. Since paths might be mock, using a colored div or similar if img fails logic isn't here, but UI expects img */}
                                    <div style={{ width: '100%', height: '100%', backgroundColor: '#333' }}>
                                        {/* This would be the image. For now, simulating the circle look. */}
                                    </div>
                                </div>
                            </td>
                            <td className="text-secondary">{tech.slug}</td>
                            <td>
                                <StatusBadge status={tech.state} />
                            </td>
                            <td className="text-end pe-3">
                                <Button variant="link" className="p-0 me-2 text-secondary" title="Duplicate">
                                    <FaCopy size={14} />
                                </Button>
                                <Link href={`/admin/technology/${tech.id}`} passHref>
                                    <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button variant="link" className="p-0 text-danger" title="Delete">
                                    <FaTrash size={14} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TechnologyTable;
