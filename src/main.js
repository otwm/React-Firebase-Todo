import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {initAuth} from "./core/auth";
import configureStore from "./core/store";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import Root from "./views/root";

/**
 * 저장소
 */
const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

function render(Root) {
    ReactDOM.render(
        <AppContainer>
            <Root history={syncedHistory} store={store}/>
        </AppContainer>
        , rootElement
    );
}

if (module.hot) {
    module.hot.accept('./views/root', ()=> {
        render(require('./views/root').default);
    });
}

initAuth(store.dispatch)
    .then(() => render(Root))
    .catch(error => console.error(error));