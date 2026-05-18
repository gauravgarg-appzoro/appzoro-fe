import React, { useState } from 'react';
import { Table, Button, Form, Badge } from 'react-bootstrap';
import { FaCopy, FaPen, FaTrash } from '../../OptimizedIcons';

const SitemapTable = () => {

    const [sortColumn, setSortColumn] = useState('url');
    const [sortDirection, setSortDirection] = useState('asc');

    // Mock data for sitemaps
    const sitemaps = [
        {
            id: '6177ec48ec8f3f931fdc9780',
            url: 'https://appzoro.com/10-mobile-app-develop...',
            lastmod: 'Friday, October 22nd 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '61775904bd8f3f9931e5e279',
            url: 'https://appzoro.com/10-years-ago-steve-job...',
            lastmod: 'Friday, October 22nd 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '614be91a88bd376d81e24749',
            url: 'https://appzoro.com/4-step-to-speed-up-km...',
            lastmod: 'Thursday, October 21st 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '61755ddd8bd8f3f931e1c9280',
            url: 'https://appzoro.com/46-years-young-the-ev...',
            lastmod: 'Thursday, October 21st 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '614d074a94e33376da4a29ec',
            url: 'https://appzoro.com/6-great-ways-to-enhan...',
            lastmod: 'Tuesday, September 14th 2021 13:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '6134280cd9b5337dd4c5a249',
            url: 'https://appzoro.com/7-must-popular-web-fr...',
            lastmod: 'Wednesday, September 8th 2021 13:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '61757ae93bd8f3f931e1e9393',
            url: 'https://appzoro.com/7-must-know-facts-abo...',
            lastmod: 'Wednesday, September 15th 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '61752ddbdcdc8f3f931e1e93ab',
            url: 'https://appzoro.com/7-reasons-why-advanc...',
            lastmod: 'Friday, October 22nd 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '6177ec94ad8f3f931fdc93b7',
            url: 'https://appzoro.com/7-tips-for-a-successf...',
            lastmod: 'Friday, October 22nd 2021 22:30',
            priority: '0.9',
            state: 'Published'
        },
        {
            id: '61cb8394be10e4bcc53f3c',
            url: 'https://appzoro.com/7-tips-for-a-successf...',
            lastmod: 'Tuesday, December 21st 2021 14:30',
            priority: '0.9',
            state: 'Published'
        }
    ];





    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const StatusBadge = ({ status }) => {
        return (
            <Badge
                bg="success"
                className="text-white px-3 py-1"
                style={{ fontSize: '11px', fontWeight: '500' }}
            >
                {status}
            </Badge>
        );
    };

    return (
        <div className="bg-white rounded shadow-sm">
            <Table hover responsive className="mb-0">
                <thead className="bg-light">
                    <tr>

                        <th style={{ width: '200px' }}>Id</th>
                        <th
                            style={{ cursor: 'pointer', width: '350px' }}
                            onClick={() => handleSort('url')}
                        >
                            Url {sortColumn === 'url' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th style={{ width: '250px' }}>Lastmod</th>
                        <th style={{ width: '100px' }}>Priority</th>
                        <th style={{ width: '120px' }}>State</th>
                        <th style={{ width: '100px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {sitemaps.map((sitemap) => (
                        <tr key={sitemap.id}>

                            <td className="small text-muted">{sitemap.id}</td>
                            <td className="small">{sitemap.url}</td>
                            <td className="small">{sitemap.lastmod}</td>
                            <td className="small">{sitemap.priority}</td>
                            <td>
                                <StatusBadge status={sitemap.state} />
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="link" size="sm" className="p-0 text-secondary">
                                        <FaCopy size={14} />
                                    </Button>
                                    <Button variant="link" size="sm" className="p-0 text-secondary">
                                        <FaPen size={14} />
                                    </Button>
                                    <Button variant="link" size="sm" className="p-0 text-secondary">
                                        <FaTrash size={14} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SitemapTable;
