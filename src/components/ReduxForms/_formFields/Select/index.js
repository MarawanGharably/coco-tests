import React, { useRef} from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Form } from "react-bootstrap";
import styles from "./Select.module.scss";

/**
 *
 * @param input
 * @param options = [{label:'', value:''}]
 * @returns {JSX.Element}
 * @constructor
 */
const SelectInput = (props) => {
    const {
        input = {},
        mode,
        searchable = false,
        className = "select",
        label = "",
        options = [],
        isMulti,
        allowCustomOptions,
        placeholder = "",
        meta,
    } = props;

    const SelectComponent = allowCustomOptions ? CreatableSelect : Select;
    const _customOptions = useRef([]);


    const onChangeEvent = (data) => {
        //Multi-Select
        if (Array.isArray(data)) {
            const newRecord = data.find((item) => item.__isNew__ === true);
            if (newRecord) _customOptions.current.push(newRecord);


            input.onChange(data.map((item) => item.value));
        } else {
            input.onChange(data.value);
        }
    };

    const calcValue = () => {

        if (isMulti && Array.isArray(input.value)) {
            return input.value.map((item) => {
                const option = [...options, ..._customOptions.current].find((optItem) => optItem["value"] === item);
                return {
                    //item used for custom options as default value
                    label: option?.label || item,
                    value: item,
                };
            });
        } else {
            return input.value ? options.find((item) => item["value"] === input.value) : "";
        }
    };




    return (
        <Form.Group className={`formField ${styles.cmp} ${className} ${mode ? styles[`${mode}-mode`] : ""}`}>
            {label && <Form.Label>{label}</Form.Label>}
            <SelectComponent
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
