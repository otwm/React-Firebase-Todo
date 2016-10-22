import firebase from "firebase";
import {firebaseAuth} from "src/core/firebase";
import {INIT_AUTH, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from "./action-types";

//TODO: 노출 되는 인터페이스 중 노출 안시켜도 될 것이 있는가?

/**
 * 인증
 * 커링을 통한 인증 함수. 디스패치를 넘겨주고, 그에 따라 인증에 따라 디스패치가 같이 이루어 진다.
 *
 * @param provider 제공자
 * @returns {function(*)} 인증 함수
 */
function authenticate(provider) {
    return dispatch => {
        firebaseAuth.signInWithPopup(provider)
            .then(result => dispatch(signInSuccess(result)))
            .catch(error => dispatch(signInError(error)));
    }
}

/**
 * INIT_AUTH action creator
 *
 * @param user
 * @returns {{type: string, payload: *}}
 */
export function initAuth(user) {
    return {
        type: INIT_AUTH,
        payload: user
    };
}

/**
 * 인증 에러 action creator
 *
 * @param error
 * @returns {{type: string, payload: *}}
 */
export function signInError(error) {
    return {
        type: SIGN_IN_ERROR,
        payload: error
    };
}

/**
 * 인증 성공 action creator
 *
 * @param result
 * @returns {{type: string, payload: *}}
 */
export function signInSuccess(result) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: result.user
    };
}

/**
 * github 인증
 *
 * @returns {function(*)}
 */
export function signInWithGithub() {
    return authenticate(new firebase.auth.GithubAuthProvider());
}

/**
 * 구글 인증
 *
 * @returns {function(*)}
 */
export function signInWithGoogle() {
    return authenticate(new firebase.auth.GoogleAuthProvider());
}

/**
 * 트위터 인증
 *
 * @returns {function(*)}
 */
export function signInWithTwitter() {
    return authenticate(new firebase.auth.TwitterAuthProvider());
}

/**
 * 인증 아웃
 * @returns {function(*)}
 */
export function signOut() {
    return dispatch => {
        firebaseAuth.signOut().then(()=>dispatch(signOutSuccess()))
    };
}

/**
 * 인증 성공
 * @returns {{type: string}}
 */
export function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS
    };
}
