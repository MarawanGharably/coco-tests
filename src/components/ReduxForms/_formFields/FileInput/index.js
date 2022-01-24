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
export default function FileInput({ input, label, accept, placeholder = 'Upload File', meta: { visited, error, warning }, }) {

    return (
        <Form.Group className={`form-input ${styles['cmp']}`}>
            {label && (<Form.Label>{label}</Form.Label>)}

            <div className={`${styles.inputWrapper} form-control`}>
                {!input.value ?
                    (<FileUploader
                        input={input}
                        placeholder={placeholder}
                        accept={accept}
                    />)
                    : (<FilePreview input={input} />)
                }
            </div>



            {visited && (error || warning) && (
                <ul className='form-field-error'>
                    {error && <li className='field-error'>{error}</li>}
                    {warning && <li className='field-warn'>{warning}</li>}
                </ul>
            )}
        </Form.Group>
    );
}

const FileUploader = ({ input, placeholder, accept }) => {
    const { value, ...inputData } = input;
    const onChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (readData) => {
                input.onChange([
                    { content: readData.target.result, filename: file.name.split('.')[0], type: file.type },
                ]);
            };
            // console.log('onChange', { file, input });
        }
    };

    return (
        <div className={styles.fileUploader}>
            <input
                {...inputData}
                type='file'
                accept={accept}
                onChange={onChange}
                onBlur={(e) => e.preventDefault()}
            />
            <img className={`${styles['uploadImg']}`} src={Icon} />
            {placeholder}
        </div>
    );
};

//TODO: can display img/png files and delete icon
const FilePreview = ({ input }) => (
    <div className={`d-flex ${styles.filePreview}`}>
        <i className='fas fa-file'></i>
        <div>{input?.value?.[0].filename || 'File'}</div>
        <i className="fas fa-trash-alt" onClick={e=>input.onChange(null)}></i>
    </div>
);

