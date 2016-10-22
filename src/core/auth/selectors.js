/**
 * 자주 사용하는 것을 추상화함
 */

/**
 * 인증 객체
 * @param state
 * @returns {*}
 */
export function getAuth(state) {
    return state.auth;
}

/**
 * 인증 여부
 * @param state
 * @returns {boolean|*}
 */
export function isAuthenticated(state) {
    return getAuth(state).authenticated;
}