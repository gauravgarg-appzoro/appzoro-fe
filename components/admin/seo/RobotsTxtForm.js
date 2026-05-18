import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const RobotsTxtForm = ({ initialData = {} }) => {
    const [robotContent, setRobotContent] = useState(
        initialData.content || ''
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Robot content:', robotContent);
        // Handle form submission
    };

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold mb-3">
                            Robot Content
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={20}
                            value={robotContent}
                            onChange={(e) => setRobotContent(e.target.value)}
                            className="bg-white"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '13px',
                                lineHeight: '1.6'
                            }}
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button
                            variant="primary"
                            type="submit"
                            className="px-4"
                        >
                            Update
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            className="px-4"
                        >
                            Reset
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RobotsTxtForm;
