import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './fileInput.module.scss';
import { sanitizeFile } from '../../../../utils/FileManager';


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

export default function FileInput({
									  input,
									  label,
									  accept,
									  placeholder = 'Upload File',
									  variant='dark',
									  meta: { visited, error, warning },
								  }) {
	return (
		<Form.Group className={`form-input ${styles['cmp']} ${variant ? styles[`${variant}-variant`]:''}`}>
			{label && (<Form.Label>{label}</Form.Label>)}

			<div className={`${styles.inputWrapper} form-control`}>

				{/*
                Always Keep it mounted.
                Rare case, but some UI's should have access to this field
                */}
				<FileUploader
					input={input}
					placeholder={placeholder}
					accept={accept}
					className={input.value ? 'd-none' : ''}
				/>

				{input?.value && <FilePreview input={input} />}
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

const FileUploader = ({ input, placeholder, accept, className }) => {
	const { value, ...inputData } = input;

	const onChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = (readData) => {
				//for single file selection should return object instead of array
				const newFileData = sanitizeFile({
					name: file.name, //full file name as in File class
					filename: file.name.split('.')[0], //Only file name
					content: readData.target.result,
				});

				input.onChange(newFileData);
			};
		}
	};

	return (
		<div className={`${styles.fileUploader} ${className}`}>
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

//TODO: can display img/png files
const FilePreview = ({ input }) => {
	const { name, content, url } = input.value || {};
	const ext = name.split('.').pop();
	const src = url && ext ? url : content;
	return (<div className={`d-flex ${styles.filePreview}`}>
		<PreviewImage ext={ext} src={src} />
		<div>{name || 'File'}</div>
		<i className='fas fa-trash-alt' onClick={e => input.onChange(null)}></i>
	</div>);
};


const PreviewImage = ({ src, ext }) => {
	// console.log('PreviewImage', { src });
	return (<div className={styles.previewImage}>
		{['png', 'jpg', 'jpeg'].includes(ext) ?
			(<img src={src} />) :
			(<i className='fas fa-file'></i>)}
	</div>);
};