import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import styles from './RangeInputForm.module.scss';

const RangeInputForm = ({ order, handleOrderChange, size, handleSizeChange }) => (
    <Form className={styles['product-image-controls-form']}>
        <Form.Group controlId="formGroupOrder">
            <Form.Label className={styles['label']}>Order:</Form.Label>
            <Form.Control type="number" value={order} onChange={handleOrderChange} />
        </Form.Group>

        <Form.Group controlId="formGroupRange">
            <Form.Label className={styles['label']}>Size:</Form.Label>
            <Row className={styles['range']}>
                <Col>
                    <Form.Range
                        min={0.01}
                        max={10}
                        step={0.01}
                        value={size}
                        onChange={handleSizeChange}
                        className='input-field form-control'
                        style={{backgroundColor:'#fefefe', padding:'0.9em 0.6em'}}
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
            </Row>
        </Form.Group>
    </Form>
);

RangeInputForm.propTypes = {
    order: PropTypes.number.isRequired,
    handleOrderChange: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    handleSizeChange: PropTypes.func.isRequired,
};

export default RangeInputForm;
