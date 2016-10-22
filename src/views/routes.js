import {isAuthenticated} from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Tasks from './pages/tasks';

/**
 * 경로 정보
 * @type {{ROOT: string, SIGN_IN: string, TASKS: string}}
 */
export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    TASKS: '/'
};

/**
 * 인증 필요
 * @param getState
 * @returns {function(*, *)}
 */
const requireAuth = getState => {
    return (nextState, replace) => {
        if (!isAuthenticated(getState())) {
            replace(paths.SIGN_IN);
        }
    };
};

/**
 * 인증 필요 없음.
 * @param getState
 * @returns {function(*, *)}
 */
const requireUnauth = getState => {
    return (nextState, replace) => {
        if (isAuthenticated(getState())) {
            replace(paths.TASKS);
        }
    };
};

/**
 * 라우트 정보
 * @param getState
 * @returns {{path: string, component: *, childRoutes: *[]}}
 */
export const getRoutes = getState => {
    console.log('getState');
    console.log(getState);
    return {
        path: paths.ROOT,
        component: App,
        childRoutes: [
            {
                indexRoute: {
                    component: Tasks,
                    onEnter: requireAuth(getState)
                }
            },
            {
                path: paths.SIGN_IN,
                component: SignIn,
                onEnter: requireUnauth(getState)
            }
        ]
    };
};