import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function RecordsList({ records, recordComponent, className }) {
    if (!records) return false;
    const RecordComponent = recordComponent;

    return (
        <Row xs={1} sm={2} md={3} lg={4} className={`recordsList ${className}`}>
            {records.map((data, idx) => (
                <Col className="mb-4" key={idx}>
                    <RecordComponent data={data} />
                </Col>
            ))}
        </Row>
    );
}