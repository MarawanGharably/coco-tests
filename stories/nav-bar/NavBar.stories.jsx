import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withKnobs, text } from '@storybook/addon-knobs';
import Link from 'next/link';

import '../../src/assets/main.css'

const NavBarItem = ({ pathName, name, children }) => {
    return (
        <li>
            <Link href={pathName}><a>{name}</a></Link>
            { children }
        </li>
    )
}

const NavBar = ({ children }) => {
    const [currentlySelected, setCurrentlySelected] = useState('');

    return (
        <div>
            <nav>
                <ul>
                    <NavBarItem
                        pathName='/design'
                        name='STORE DESIGN'
                    >
                        <ul>
                            <NavBarItem
                                pathName='design/test'
                                name='TEST'
                            />
                        </ul>
                    </NavBarItem>
                    <NavBarItem
                        pathName='/elements'
                        name='BRAND ELEMENTS'
                    />
                </ul>
            </nav>
        </div>
    );
}

const Child = () => {

    return (
        <div>

        </div>
    )
}

const DesignPage = () => {
    return (
        <div>

        </div>
    )
}

export default {
    title: 'NavBar',
    component: NavBar,
    decorators: [withKnobs],
};

// stories: each function is a state (aka 'story') - export when you want to render to storybook and to pass props or styles
export const NavBarTest = () => {
    return (
        <div style={{ display: 'flex' }}>

        </div>
    );
};
