import App from './app';

export const paths = {
    ROOT: '/',
    SIGN_IN:'/sign-in',
    TASKS:'/'
};

export const getRoutes = getState => {
    return {
        path:paths.ROOT,
        component:App
    };
};