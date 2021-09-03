import React, {useState} from 'react';
import Select from 'react-select';


/**
 *
 * @param input
 * @param options = [{label:'', value:''}]
 * @returns {JSX.Element}
 * @constructor
 */
const SelectInput = ({ input = {}, searchable=false, className='select', label = '', options = [], isMulti=false, placeholder='',  meta: { touched, error, warning } }) => {

    const onChangeEvent = (data) => {
        //Single value
        if(data?.value) input.onChange(data.value);

        //Multi-Select
        else if(Array.isArray(data)){
            input.onChange(data.map(item=>item.value));
        }
    };


    const calcValue=()=>{
        if(isMulti && Array.isArray(input.value)){
            return input.value.map(item=>{
                const option = options.find(optItem=> optItem['value'] === item);
                return {
                    label: option?.label || 'Record Not Exist',
                    value: item
                };
            });
        }else{
            return options.find(item=> item['value'] === input.value);
        }
    }

    // console.log('>Select', {input, options, isMulti,  });


    return <Select
        name={input.name}
        className= {className}
        value={calcValue()}
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        searchable={searchable}
        onChange={onChangeEvent}

    />;
};

export default SelectInput;
