import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Spinner, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductTable from '../../../components/admin/products/ProductTable';
import adminService from '../../../services/admin.service';
import {   FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaTrash   } from '../../../components/OptimizedIcons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0); // Reset to first page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, page, limit]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const [listResult, countResult] = await Promise.all([
                adminService.getProducts({ page, limit, search: debouncedSearch }),
                adminService.getProductsCount({ search: debouncedSearch }),
            ]);
            if (listResult.success) {
                setProducts(Array.isArray(listResult.data) ? listResult.data : []);
            }
            if (countResult.success) {
                setTotalCount(countResult.count || 0);
            }
        } catch (error) {
            toast.error('Failed to fetch products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const result = await adminService.deleteProduct(id);
            if (result.success) {
                toast.success('Product deleted successfully');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        }
    };

    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    return (
        <AdminLayout title="Products">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div className="mb-3 mb-md-0">
                    <h2 className="fw-bold mb-1">Products</h2>
                    <p className="text-secondary mb-0 small">{totalCount} entries found</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0">
                            <FaSearch className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search products..."
                            className="border-start-0 ps-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    <Link href="/admin/products/create" passHref>
                        <Button variant="primary" className="d-flex align-items-center px-4 text-nowrap">
                            <FaPlus className="me-2" /> Add New
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <ProductTable products={products} onDelete={handleDelete} />
            )}

            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top rounded-bottom">
                <div className="d-flex align-items-center">
                    <Form.Select
                        size="sm"
                        value={limit}
                        onChange={(e) => { setLimit(Number(e.target.value)); setPage(0); }}
                        className="me-2"
                        style={{ width: '70px' }}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </Form.Select>
                    <span className="text-secondary small fst-italic">entries per page</span>
                </div>

                <div className="d-flex align-items-center">
                    <span className="me-3 text-secondary small">
                        Page {page + 1} of {totalPages}
                    </span>
                    <Button
                        variant="white"
                        className="border rounded-start p-2"
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                    >
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <Button
                        variant="white"
                        className="border rounded-end p-2"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => p + 1)}
                    >
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductList;
