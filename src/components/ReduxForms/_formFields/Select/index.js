import React from 'react';
import Select from 'react-select';

const SelectInput = ({ input = {}, label = '', options = [], isMulti=false, placeholder='', disabled, meta: { touched, error, warning } }) => {

    const onChangeEvent = (data) => {

        //Single value
        if(data?.value){
            input.onChange(data.value);
        }

        //Multi-Select
        if(Array.isArray(data)){
            const values = data.map(item=>item.value);
            input.onChange(values);
        }

    };

    return <Select
        className="select"
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        onChange={onChangeEvent} />;
};

export default SelectInput;
