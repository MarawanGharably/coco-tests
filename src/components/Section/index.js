import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Section = ({ title = '', children, titleMargin }) => {
	return (
		<Row className="justify-content-center mt-3">
			<h3 style={titleMargin}>{title}</h3>
			{children}
		</Row>
	);
};

Section.propTypes = {
	title: PropTypes.string,
};

export default Section;
