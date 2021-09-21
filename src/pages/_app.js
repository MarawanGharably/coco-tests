import React from 'react';
import { Provider } from 'react-redux';
import reduxStore, { wrapper } from '../store';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const store = reduxStore();
import { getLoginRedirectPath, rollbarInit } from '../utils';
import AppAlerts from '../components/AppAlerts';
import { getCurrentUserData } from '../APImethods';

//Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/main.css';

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();

    //Private routes/pages
    const sessionCookie = cookies.get('access_token');
    const PROTECTED_ROUTES = [/^\/admin/, /^\/create/];
    const isProtectedRoute = PROTECTED_ROUTES.some((rx) => rx.test(router.route)) || router.route === '/';

    if (isProtectedRoute && !sessionCookie && process.browser) {
        router.push(getLoginRedirectPath());
    }

    // Initialize RollBar
    rollbarInit();

    //Fetch User Data if not exist in cookie & session is active. Exclude auth pages
    if (!store.getState().user && sessionCookie && !router.pathname.includes('auth')) {
        store.dispatch(getCurrentUserData({ updateUserStore: true })).catch((err) => {
            console.log('Error fetching USER DATA ', err.data);
        });
    }

    return (
        <Provider store={store}>
            <AppAlerts />
            <Component {...pageProps} />
        </Provider>
    );
};

export default wrapper.withRedux(MyApp);
