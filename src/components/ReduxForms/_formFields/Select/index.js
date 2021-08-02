import React, {useState} from 'react';
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
    let defaultValues=[];

    // if(Array.isArray(input.value) && options){
    //     input.value.map(item=>{
    //         const option = options.find(optItem=> optItem['value'] == item);
    //         defaultValues.push({
    //             label: option?.label || 'Record Not Exist',
    //             value: item
    //         });
    //     });
    // }
    // else{
    //     defaultValues =input.value;
    // }




    const data={};
    //Compute selected values
    if(isMulti && Array.isArray(input.value)){
        data.value=[];
        input.value.map(item=>{
            const option = options.find(optItem=> optItem['value'] == item);
            data.value.push({
                label: option?.label || 'Record Not Exist',
                value: item
            });
        });
    }

    // console.log('>Select', {input, isMulti, defaultValues, data});

    return <Select
        className="select"
        // value={defaultValues}
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        onChange={onChangeEvent}
        {...data}
    />;
};

export default SelectInput;
