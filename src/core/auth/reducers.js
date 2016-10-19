import {Record} from "immutable";
import {INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from "./action-types";

//TODO: 인증 상태 객체 , 여기 위치하는 것이 맡는가?
/**
 * 인증 상태 객체
 * @type {Immutable.Record}
 */
export const AuthState = new Record({
    id: null,
    authenticated: false
});

/**
 * 리듀서
 * @param state 상태
 * @param payload payload
 * @param type type
 * @returns {*} 새 상태
 */
export function authReducer(state = new AuthState(), {payload, type}) {
    switch (type) {
        case INIT_AUTH:
        case SIGN_IN_SUCCESS:
            return state.merge({
                authenticated: !!payload,
                id: payload ? payload.uid : null
            });
        case SIGN_OUT_SUCCESS:
            return new AuthState();

        default:
            return state;
    }
}