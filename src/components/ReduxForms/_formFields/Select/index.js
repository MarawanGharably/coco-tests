import React from 'react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

/**
 *
 * @param input
 * @param options = [{label:'', value:''}]
 * @returns {JSX.Element}
 * @constructor
 */
const SelectInput = ({input = {}, searchable = false, className = 'select', label = '', options = [], isMulti = false, placeholder = '', meta}) => {
    const onChangeEvent = (data) => {
        //Multi-Select
        if (Array.isArray(data)) {
            input.onChange(data.map((item) => item.value));
        } else {
            input.onChange(data.value);
        }
    };

    const calcValue = () => {
        if (isMulti && Array.isArray(input.value)) {
            return input.value.map((item) => {
                const option = options.find((optItem) => optItem['value'] === item);
                return {
                    label: option?.label || 'Record Not Exist',
                    value: item,
                };
            });
        } else {
            return input.value ? options.find((item) => item['value'] === input.value) : '';
        }
    };

    // console.log('>Select', {input,calc:calcValue()  });


    return (
        <Form.Group className={`select-input-field ${className}`}>
            {label && (<Form.Label>{label}</Form.Label>)}
            <Select
                name={input.name}
                className={className}
                value={calcValue()}
                isMulti={isMulti}
                placeholder={placeholder}
                options={options}
                searchable={searchable}
                onChange={onChangeEvent}
            />
        </Form.Group>
    );
};

export default SelectInput;
