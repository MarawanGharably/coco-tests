import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className="flex flex-column full-width">
        <Link to="/signup">Register Here</Link>
        <Link to="/create/design">Create a store</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/example">See Example</Link>
    </div>
);

export default HomePage;
