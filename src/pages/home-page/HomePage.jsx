import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div>
        <Link to="/register">Register Here</Link>
        <Link to="/create/design">Create a store</Link>
    </div>
);

export default HomePage;
