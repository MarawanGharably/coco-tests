import React, { useState } from 'react';
import PropTypes from 'prop-types';


const FileUpload = ({ isMultipleFiles }) => {
    const [fileName, setFileName] = useState('');
    const [stagedFiles, setStagedFiles] = useState([]); // eslint-disable-line no-unused-vars

    const fileHandler = (e) => {
        const fileList = Array.from(e.target.files);
        if (fileList.length === 0) {
            return;
        }

        let name;
        if (fileList.length === 1) {
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
                htmlFor="file-upload"
            >
                <section className="file-upload-inner-wrapper">
                    <div className="file-upload-button-text">Choose File</div>
                    <div className="file-upload-text">{fileName || null}</div>
                </section>
                <input
                    id="file-upload"
                    type="file"
                    onChange={fileHandler}
                    multiple={isMultipleFiles}
                />
            </label>
        </button>
    );
};

FileUpload.propTypes = {
    isMultipleFiles: PropTypes.bool,
};

FileUpload.defaultProps = {
    isMultipleFiles: false,
};

export default FileUpload;
