import React, { useState } from 'react';
import PropTypes from 'prop-types';

// formField is required to accurately assign file uploads to its respective Input id
// without formField, files will be uploaded only to the first Input on the page.
// formField should match API shape
const FileUpload = ({ formField, isMultipleFiles }) => {
    const [fileName, setFileName] = useState('');
    const [fileUrls, setFileUrls] = useState();

    const parseFileListIntoUrls = (fileList) => {
        const nameList = [];
        fileList.forEach((file) => {
            nameList.push(file.name);
        });

        return nameList;
    };

    const fileHandler = (e) => {
        const fileList = Array.from(e.target.files);
        const parsedFileUrls = parseFileListIntoUrls(fileList);

        let name;
        if (parsedFileUrls.length === 0) {
            name = 'no files selected';
        } else if (parsedFileUrls.length === 1) {
            [name] = parsedFileUrls;
        } else {
            name = `${parsedFileUrls.length} files`;
        }

        setFileName(name);

        setFileUrls(parsedFileUrls);
        console.log(fileUrls); // eslint-disable-line
    };

    return (
        <button
            type="button"
            tabIndex="0"
            className="file-upload-wrapper flex"
        >
            <label
                className="file-upload-button flex-1"
                htmlFor={`file-upload-${formField}`}
            >
                {/* Input is functional and has display:none. The inner wrapper contains styles */}
                <input
                    id={`file-upload-${formField}`}
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
    formField: PropTypes.string.isRequired,
    isMultipleFiles: PropTypes.bool,
};

FileUpload.defaultProps = {
    isMultipleFiles: false,
};

export default FileUpload;
