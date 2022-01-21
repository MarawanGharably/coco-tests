import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({fileRef, name, hidden, multiple, handleChange}) => (
    <input
        ref={fileRef}
        name={name}
        type="file"
        accept="image/*"
        hidden={hidden}
        multiple={multiple}
        onChange={handleChange}
    />
);

FileInput.propTypes = {
    fileRef: PropTypes.shape({
        current: PropTypes.element,
    }),
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    multiple: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
    fileRef: null,
    hidden: false,
    multiple: false,
};

export default FileInput;
