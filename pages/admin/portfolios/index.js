import React from 'react';
import Link from 'next/link';
import { Button, Dropdown, Form } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import PortfolioTable from '../../../components/admin/portfolios/PortfolioTable';
import adminService from '../../../services/admin.service';
import {   FaPlus, FaCog, FaFilter, FaChevronLeft, FaChevronRight   } from '../../../components/OptimizedIcons';

const PortfolioList = () => {
    const [portfolios, setPortfolios] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);

    // Filters
    const [filterIndustry, setFilterIndustry] = React.useState('');
    const [filterTechStack, setFilterTechStack] = React.useState('');

    // Filter Options (auth via adminService)
    const [industries, setIndustries] = React.useState([]);
    const [techStacks, setTechStacks] = React.useState([]);

    React.useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [indRes, stackRes] = await Promise.all([
                    adminService.getIndustryNames({ limit: 500 }),
                    adminService.getTechStacks({ limit: 500 })
                ]);
                setIndustries(indRes.success ? (indRes.data || []) : []);
                setTechStacks(stackRes.success ? (stackRes.data || []) : []);
            } catch (err) {
                console.error("Failed to fetch options", err);
            }
        };
        fetchOptions();
    }, []);

    const fetchPortfolios = React.useCallback(async () => {
        setLoading(true);
        try {
            const listRes = await adminService.getPortfolios({
                page: page - 1,
                limit,
                sort: 'updatedAt:DESC',
                industry: filterIndustry || undefined,
                tech_stack: filterTechStack || undefined
            });
            const countRes = await adminService.getPortfoliosCount({
                industry: filterIndustry || undefined,
                tech_stack: filterTechStack || undefined
            });
            setPortfolios(listRes.success ? listRes.data : []);
            setTotal(countRes.success ? countRes.count : 0);
        } catch (err) {
            console.error("Failed to fetch portfolios", err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, filterIndustry, filterTechStack]);

    React.useEffect(() => {
        fetchPortfolios();
    }, [fetchPortfolios]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this portfolio?')) return;
        try {
            const result = await adminService.deletePortfolio(id);
            if (result.success) {
                fetchPortfolios();
            } else {
                alert(result.error || 'Failed to delete');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting portfolio');
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
            setPage(newPage);
        }
    };

    return (
        <AdminLayout title="Our Portfolios">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Our Portfolios</h2>
                    <p className="text-secondary mb-0 small">{total} entries found</p>
                </div>
                <Link href="/admin/portfolios/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" /> Add New Portfolio
                    </Button>
                </Link>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="d-flex gap-2 align-items-center">
                    <FaFilter className="text-secondary" />
                    <Form.Select
                        size="sm"
                        value={filterIndustry}
                        onChange={(e) => { setFilterIndustry(e.target.value); setPage(1); }}
                        style={{ minWidth: '150px' }}
                    >
                        <option value="">All Industries</option>
                        {industries.map(ind => (
                            <option key={ind._id || ind.id} value={ind._id || ind.id}>{ind.name}</option>
                        ))}
                    </Form.Select>

                    <Form.Select
                        size="sm"
                        value={filterTechStack}
                        onChange={(e) => { setFilterTechStack(e.target.value); setPage(1); }}
                        style={{ minWidth: '150px' }}
                    >
                        <option value="">All Tech Stacks</option>
                        {techStacks.map(ts => (
                            <option key={ts._id || ts.id} value={ts._id || ts.id}>{ts.tech_name}</option>
                        ))}
                    </Form.Select>

                    <Dropdown>
                        <Dropdown.Toggle variant="light" className="border bg-white btn-sm">
                            <FaCog size={14} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setFilterIndustry(''); setFilterTechStack(''); }}>Clear Filters</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {loading ? (
                <div className="text-center p-5">Loading...</div>
            ) : (
                <PortfolioTable portfolios={portfolios} onDelete={handleDelete} />
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex align-items-center">
                    <Form.Select
                        size="sm"
                        className="me-2"
                        style={{ width: '70px' }}
                        value={limit}
                        onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </Form.Select>
                    <span className="text-secondary small">entries per page</span>
                </div>

                <div className="d-flex align-items-center">
                    <Button
                        variant="white"
                        className="border rounded-start p-2"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <div className="d-flex border-top border-bottom">
                        <span className="px-3 py-1 text-secondary small d-flex align-items-center">
                            Page {page} of {Math.ceil(total / limit) || 1}
                        </span>
                    </div>
                    <Button
                        variant="white"
                        className="border rounded-end p-2"
                        disabled={page >= Math.ceil(total / limit)}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PortfolioList;
