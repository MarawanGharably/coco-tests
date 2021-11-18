import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './fileInput.module.scss';
const Icon = 'https://cdn.obsessvr.com/coco/uploadIcon.png';



/**
 * @param input {object}
 * @param label {string}
 * @param accept {string}
 * @param placeholder {string}
 * @param meta {object}
 * @returns {JSX.Element}
 * @constructor
 * Example:
 * <Field name='favicon' label='Favicon' component={FileInput} accept='.PNG' placeholder='Upload PNG'/>
 */
export default function FieldFileInput({ input, label, accept, placeholder = 'Upload File', meta: {visited, error, warning}}) {
    const { value, ...inputData } = input;

    const onChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            //console.log('onChange', { file, input });
            input.onChange(file);
        }
    };

    return (
        <Form.Group className={`form-input ${styles['cmp']}`}>
            <Form.Label>{label}</Form.Label>

            <input {...inputData} type="file" accept={accept} onChange={onChange} onBlur={e=>e.preventDefault()} />

            <div className={styles['uploadFileWrapper']}>
                {input?.value?.name || <NoFileSelected placeholder={placeholder} />}
            </div>
            {visited  && (error || warning) && (
                <ul className="form-field-error">
                    {error && <li className="field-error">{error}</li>}
                    {warning && <li className="field-warn">{warning}</li>}
                </ul>
            )}
        </Form.Group>
    );
}

const NoFileSelected = ({ placeholder }) => {
    return (
        <>
            <img className={`${styles['uploadImg']}`} src={Icon} />
            {placeholder}
        </>
    );
};