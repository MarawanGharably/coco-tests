import React from 'react';
import { Container } from 'react-bootstrap';
import './Layout.scss';

export default function Layout({ title, subTitle, fluid=false, children }) {
    return (
        <Container fluid={fluid} >
            {title && <h2 className="text-center">{title}</h2>}
            {subTitle && <h5 className="text-secondary text-center">{subTitle}</h5>}

            {children}
        </Container>
    );
}