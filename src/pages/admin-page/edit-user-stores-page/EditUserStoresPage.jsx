import React, { useEffect, useState } from 'react';

const EditUserStoresPage = () => {
    const [placeholder, setPlaceholder] = useState(false);

    useEffect(() => {
        setPlaceholder(true);
    }, [placeholder]);

    return (
        <div>hello</div>
    );
};

export default EditUserStoresPage;
