import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reduxStore from './store';
import App from './App';

ReactDOM.render(
    <Provider store={reduxStore}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('obsessvr-webstore-react-embed-root'),
);
