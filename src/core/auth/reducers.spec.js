import {INIT_AUTH,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS
} from "./action-types";
import {authReducer} from "./reducers";

describe('auth reducer', ()=> {
    describe('init auth', ()=> {
        it('인증 초기화', ()=> {
            let state = authReducer(undefined, {
                type: INIT_AUTH,
                payload: null
            });

            expect(state.authenticated).toBe(false);
            expect(state.id).toBe(null);
        });
    });

    it('가상 아이디 발급함', ()=> {
        let state = authReducer(undefined, {
            type: INIT_AUTH,
            payload: {uid: "test"}
        });

        expect(state.authenticated).toBe(true);
        expect(state.id).toBe("test");
    });
});

describe('sign in success',()=>{
    it('',()=>{
        let state = authReducer(undefined, {
            type: SIGN_IN_SUCCESS,
            payload: {uid: "test"}
        });

        expect(state.authenticated).toBe(true);
        expect(state.id).toBe("test");
    });
});

describe('sign in out success',()=>{
    it('',()=>{
        let state = authReducer(undefined, {
            type: SIGN_OUT_SUCCESS
        });

        expect(state.authenticated).toBe(false);
        expect(state.id).toBe(null);
    });
});

