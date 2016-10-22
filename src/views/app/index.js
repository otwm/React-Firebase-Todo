import React, {Component, PropTypes} from "react";
import {paths} from "../routes";
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { connect } from 'react-redux';
import Header from '../component/header';

export class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const {router} = this.context;
        const {auth} = this.props;

        //logout 되는 상황. 세션 타임 아웃 등.
        if (auth.authenticated && !nextProps.auth.authenticated) {
            router.replace(paths.SIGN_IN);
            //login 되는 상황
        } else if (!auth.authenticated && nextProps.auth.authenticated) {
            router.replace(paths.TASKS);
        }

    }

    render() {
        return (
            <div>
                <Header
                    authenticated={this.props.auth.authenticated}
                    signOut={this.props.signOut}
                />
                <main className="main">{this.props.children}</main>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    getAuth,
    auth => ({auth})
);

export default connect(
    mapStateToProps,
    authActions
)(App);