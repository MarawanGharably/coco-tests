import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import reduxStore from './store';
import App from './App';

ReactDOM.render(
    <Provider store={reduxStore}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('coco-root'),
);
