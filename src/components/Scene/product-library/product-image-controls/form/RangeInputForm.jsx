import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import styles from './RangeInputForm.module.scss';


/**
 *
 * @param order {number} //behave as z-index for scene object
 * @param scale {number}
 * @param handleOrderChange - function wrapped in debounce()
 * @param handleScaleChange - function wrapped in debounce()
 */
const RangeInputForm = ({ order, scale, handleOrderChange, handleScaleChange }) => {
    const [sizeVal, setSize] = React.useState(scale);
    const [orderVal, setOrder] = React.useState(order);

    const onOrderChanged=(e)=>{
        setOrder(e.target.value);
        handleOrderChange(e);
    }

    return (
        <Form className={styles['product-image-controls-form']}>
            <Form.Group controlId="formGroupOrder">
                <Form.Label className={styles['label']}>Order:</Form.Label>
                <Form.Control
                    type="number"
                    value={orderVal}
                    onChange={onOrderChanged}
                />
            </Form.Group>

            <Form.Group controlId="formGroupRange">
                <Form.Label className={styles['label']}>Size:</Form.Label>
                <Row className={styles['range']}>
                    <Col>
                        <Form.Range
                            min={0.01}
                            max={10}
                            step={0.01}
                            value={sizeVal}
                            onChange={e=>setSize(e.target.value)}
                            onMouseUp={handleScaleChange}
                            className='input-field form-control'
                            style={{backgroundColor:'#fefefe', padding:'0.9em 0.6em'}}
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Control
                            type="text"
                            value={sizeVal}
                            size="sm"
                            onChange={(e)=>{
                                setSize(e.target.value);
                                handleScaleChange(e);
                            }}
                        />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
};

RangeInputForm.propTypes = {
    order: PropTypes.number.isRequired,
    handleOrderChange: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
    handleScaleChange: PropTypes.func.isRequired,
};

export default RangeInputForm;
