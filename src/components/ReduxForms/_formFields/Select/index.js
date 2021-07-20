import React from 'react';
import Select from 'react-select';

const SelectInput = ({ input = {}, label = '', options = [], isMulti=false, placeholder='',  meta: { touched, error, warning } }) => {

    const onChangeEvent = (data) => {
        //Single value
        if(data?.value) input.onChange(data.value);

        //Multi-Select
        else if(Array.isArray(data)){
            input.onChange(data.map(item=>item.value));
        }
    };

    //Compute selected values
    const defaultValues =[];
    Array.isArray(input.value) && input.value.map(item=>{
        const option = options.find(optItem=> optItem['value'] == item);
        defaultValues.push({
            label: option?.label || 'Record Not Exist',
            value: item
        });
    });


    return <Select
        className="select"
        value={defaultValues}
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        onChange={onChangeEvent} />;
};

export default SelectInput;
