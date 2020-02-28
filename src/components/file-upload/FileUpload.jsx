import React, { useState } from 'react';
import PropTypes from 'prop-types';

// id is required to accurately assign file uploads to its respective input
// without id, files will be uploaded only to the first input on the page.

const FileUpload = ({ id, isMultipleFiles }) => {
    const [fileName, setFileName] = useState('');
    const [stagedFiles, setStagedFiles] = useState([]); // eslint-disable-line no-unused-vars

    const fileHandler = (e) => {
        const fileList = Array.from(e.target.files);
        let name;
        if (fileList.length === 0) {
            name = 'no files selected';
        } else if (fileList.length === 1) {
            name = fileList[0].name;
        } else {
            name = `${fileList.length} files`;
        }

        setFileName(name);
        setStagedFiles(fileList);
    };

    return (
        <button
            type="button"
            tabIndex="0"
            className="file-upload-wrapper flex"
        >
            <label
                className="file-upload-button flex-1"
                htmlFor={`file-upload-${id}`}
            >
                {/* Input is functional and has display:none. The inner wrapper contains styles */}
                <input
                    id={`file-upload-${id}`}
                    className="file-upload-input"
                    type="file"
                    onChange={fileHandler}
                    multiple={isMultipleFiles}
                />
                <div className="file-upload-inner-wrapper">
                    <div className="file-upload-button-text">Choose File</div>
                    <div className="file-upload-text">{fileName || null}</div>
                </div>
            </label>
        </button>
    );
};

FileUpload.propTypes = {
    id: PropTypes.string.isRequired,
    isMultipleFiles: PropTypes.bool,
};

FileUpload.defaultProps = {
    isMultipleFiles: false,
};

export default FileUpload;
