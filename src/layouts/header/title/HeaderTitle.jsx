import React from 'react';
import { useHomePageDataStore } from '../../../data-store/home-page-data-store/HomePageDataStore';

const HeaderTitle = () => {
    const [state] = useHomePageDataStore();

    return (
        <div className="header-title">{state.pageHeaderTitle}</div>
    );
};

export default HeaderTitle;
