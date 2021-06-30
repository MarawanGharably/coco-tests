import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const RangeInput = ({
    order, handleOrderChange, size, handleSizeChange,
}) => (
    <Form className="product-image-controls-form">
        <Form.Group controlId="formGroupOrder">
            <Form.Label className="product-image-controls-form-label">Order:</Form.Label>
            <Form.Control type="number" value={order} onChange={handleOrderChange} />
        </Form.Group>
        <Form.Group controlId="formGroupRange">
            <Form.Label className="product-image-controls-form-label">Size:</Form.Label>
            <Form.Row className="product-image-controls-form-range">
                <Col>
                    <Form.Control
                        type="range"
                        min={0.01}
                        max={10}
                        step={0.01}
                        value={size}
                        onChange={handleSizeChange}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Control
                        type="text"
                        value={size}
                        onChange={handleSizeChange}
                        size="sm"
                    />
                </Col>
            </Form.Row>
        </Form.Group>
    </Form>
);

RangeInput.propTypes = {
    order: PropTypes.number.isRequired,
    handleOrderChange: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    handleSizeChange: PropTypes.func.isRequired,
};

export default RangeInput;
