import React, { useState } from 'react';
import { Field } from 'redux-form';
import { Form } from 'react-bootstrap';
import Input from '../../_formFields/Input';
import FieldFileInput from '../../_formFields/FileInput';
import styles from './FileUploadTabs.module.scss'; 


export default function FileUploadTabs ({ label = '', type = '' }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const onClick = (e) => {
        setSelectedIndex(e.target.id);
    }

    return (
        <>
            {label && (<Form.Label>{label}</Form.Label>)}
            <div className={styles["tabs"]}>
                <div className={styles["tab-list"]}>
                    <button type="button" id='0' className={selectedIndex == 0 ? styles["tab-active"] : styles["tab-inactive"]}
                        onClick={onClick}
                        aria-selected="true">
                        Upload
                    </button>
                    <button type="button" id='1' className={selectedIndex == 1 ? styles["tab-active"] : styles["tab-inactive"]}
                        onClick={onClick}
                        aria-selected="false">
                        Link
                    </button>
                </div>
                <div
                    className={styles["tab-panel"]} 
                    hidden={selectedIndex == 1}>
                    <Field name='imageFile' component={FieldFileInput} accept='image/*' placeholder={"Upload " + (type=='image' ? 'Image' : 'Video')} />
                </div>
                <div
                    className={styles["tab-panel"]}
                    hidden={selectedIndex == 0}>
                    <Field name='imageURL' placeholder="Paste Link" component={Input}/>
                </div>
            </div>
        </>
    )
}