import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className="flex flex-column full-width">
        <Link to="/register">Register Here</Link>
        <Link to="/create/design">Create a store</Link>
        <Link to="/example">See Example</Link>
    </div>
);

export default HomePage;
