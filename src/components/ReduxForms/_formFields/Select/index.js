import React from 'react';
import Select from 'react-select';

const Select2 = ({ input = {}, label = '', options = [], placeholder='', disabled, meta: { touched, error, warning } }) => {

    const onChangeEvent = (data) => {
        const values = data.map(item=>item.value);
        input.onChange(values);
    };

    return <Select className="select col-12" isMulti placeholder={placeholder} options={options} onChange={onChangeEvent} />;
};

export default Select2;
