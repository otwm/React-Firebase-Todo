import {firebaseAuth} from "src/core/fiebase";
import * as authActions from "./actions";

/**
 * 인증 초기화
 * 인증 상태 변경을 통한 사용자 상태 디스패치 및 인증 상태 변경 바인딩 구독해체.
 * 또한 promise를 통해 제어함.
 * @param dispatch
 * @returns {Promise}
 */
export function initAuth(dispatch) {
    return new Promise((resolve, reject)=> {
        const unsub = firebaseAuth.onAuthStateChanged(
            user => {
                dispatch(authActions.initAuth(user));
                unsub();
                resolve();
            },
            error => reject(error)
        );
    });
}

/**
 * 인증 액션 노출
 */
export * from './action-types';