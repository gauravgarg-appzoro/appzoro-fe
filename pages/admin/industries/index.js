import React, { useState, useEffect } from 'react';
import { Form, Badge } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import {
    AdminListHeader,
    AdminSearchBar,
    AdminTable,
    AdminPagination,
    AdminTableRowActions,
} from '../../../components/admin/ui';

const INDUSTRY_COLUMNS = [
    { label: 'ID' },
    { label: 'Title' },
    { label: 'Slug' },
    { label: 'Status' },
    { label: 'Published At' },
    { label: 'Created At' },
];

const IndustryList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await adminService.getIndustries({ page, limit, search, sort: 'createdAt:DESC' });
            if (Array.isArray(result)) {
                setData(result);
            } else if (result?.data && Array.isArray(result.data)) {
                setData(result.data);
            } else {
                setData([]);
            }
            const count = await adminService.getIndustriesCount({ search });
            if (count.success) setTotal(count.count);
        } catch (error) {
            console.error('Error fetching industries:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, search]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this industry?')) {
            await adminService.deleteIndustry(id);
            fetchData();
        }
    };

    return (
        <AdminLayout title="Industry Content">
            <AdminListHeader
                title="Industry Content"
                subtitle={`${total} entries found`}
                addHref="/admin/industry/create"
                addLabel="Add New Entry"
            />

            <AdminSearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search..."
            />

            <AdminTable
                columns={INDUSTRY_COLUMNS}
                showCheckbox
                loading={loading}
                empty={!loading && data.length === 0}
                emptyColSpan={8}
                emptyMessage="No content found"
            >
                {data.map((item) => {
                    const itemId = item._id || item.id;
                    const status = item.published_at ? 'Published' : 'Draft';
                    return (
                        <tr key={itemId}>
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td>{itemId}</td>
                            <td>{item.Title}</td>
                            <td>{item.slug}</td>
                            <td>
                                <Badge bg={item.published_at ? 'success' : 'secondary'}>{status}</Badge>
                            </td>
                            <td>{item.published_at ? new Date(item.published_at).toLocaleDateString() : '-'}</td>
                            <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                            <AdminTableRowActions
                                editHref={`/admin/industry/${itemId}`}
                                onDelete={() => handleDelete(itemId)}
                            />
                        </tr>
                    );
                })}
            </AdminTable>

            <AdminPagination
                page={page}
                total={total}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={(newLimit) => setLimit(newLimit)}
            />
        </AdminLayout>
    );
};

export default IndustryList;
