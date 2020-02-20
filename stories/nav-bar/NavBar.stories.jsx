import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams } from 'react-router-dom';

import '../../src/main.scss'

const NavBarItem = ({ pathName, name, children }) => {
    return (
        <li>
            <Link to={pathName}>{name}</Link>
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
    const { slug } = useParams()
    return (
        <div>
            <h3>{slug}</h3>
        </div>
    )
}

const DesignPage = () => {
    return (
        <div>
            <Redirect to="/test"/>
            <Switch>
                <Route path="design/:slug" component={<Child/>}/>
            </Switch>
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
        <div css={css`display:flex;`}>
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/design" children={<DesignPage/>}/>
                </Switch>
            </Router>
        </div>
    );
};
