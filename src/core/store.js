import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default (initialState = {}) => {
    debugger;
    let middleware = applyMiddleware(thunk);

    //devtool 삽입
    if (process.env.NODE_ENV !== 'production') {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension == 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(reducers, initialState, middleware);
    console.log(store);
    if (module.hot) {
        module.hot.accept('./reducers', ()=> {
            store.replaceReducer(require('./reducers').default);
            console.log(require('./reducers').default);
        });
    }

    return store;
};