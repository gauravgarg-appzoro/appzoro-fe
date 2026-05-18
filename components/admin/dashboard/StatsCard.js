import React from 'react';
import { Card } from 'react-bootstrap';

const StatsCard = ({ title, value, icon: Icon, color, percentage, trend = 'up', gradient }) => {
    const gradients = {
        purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        blue: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        orange: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        yellow: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
        red: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    };

    const accentColors = {
        purple: '#6366f1',
        blue: '#3b82f6',
        orange: '#f59e0b',
        yellow: '#eab308',
        red: '#ef4444',
        green: '#10b981',
    };

    const bg = gradient || gradients[color] || gradients.blue;

    return (
        <Card
            className="admin-stats-card border-0 h-100 text-white overflow-hidden"
            style={{
                background: bg,
                borderRadius: '16px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
        >
            <Card.Body className="p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    {Icon && (
                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: 48,
                                height: 48,
                                background: 'rgba(255,255,255,0.2)',
                            }}
                        >
                            <Icon size={24} />
                        </div>
                    )}
                </div>
                <h2 className="mb-1 fw-bold admin-stats-value">{value}</h2>
                <p className="mb-0 admin-stats-title">{title}</p>
            </Card.Body>
            <style jsx global>{`
                .admin-stats-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.2);
                }
                .admin-stats-value { font-size: 1.75rem; letter-spacing: -0.02em; }
                .admin-stats-title { font-size: 0.9rem; opacity: 0.95; }
            `}</style>
        </Card>
    );
};

export default StatsCard;
