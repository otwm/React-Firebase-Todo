import {List, Record} from "immutable";
import {SIGN_OUT_SUCCESS} from "src/core/auth";
import {
    CREATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    FILLTER_TASK,
    LOAD_TASKS,
    UPDATE_TASK_SUCCESS
} from "./action-types";

/**
 * 태스크 상태
 * deleted : 삭제된 태스크
 * filter :  적용된 필타ㅓ
 * list : 태스크 리스트
 * previous : 이전 리스트
 * @type {Immutable.Record}
 */
export const TasksState = new Record({
    deleted: null,
    filter: '',
    list: new List(),
    previous: null
});

/**
 * 태스크 리듀서
 * @param state
 * @param payload
 * @param type
 * @returns {*}
 */
export function tasksReducer(state = new TasksState(),
    {payload, type}) {
    switch (type) {
        case CREATE_TASK_SUCCESS:
            return state.merge({
                deleted: null,
                previous: null,
                list: state.deleted && state.deleted.key === payload.key ?
                    state.previous :
                    state.list.unshift(payload)//TODO:이러면 갯수가 반환되지 않나? 체크해 보자.
            });

        case DELETE_TASK_SUCCESS:
            return state.merge({
                deleted: payload,
                previous: state.list,
                list: state.list.filter(task => task.key !== payload.key)
            });

        case FILLTER_TASK:
            return state.set('filter', payload.filterType || '');

        case LOAD_TASKS:
            return state.set('list', new List(payload.reverse()));

        case UPDATE_TASK_SUCCESS:
            return state.merge({
                deleted: null,
                previous: null,
                list: state.list.map(task => {
                    return task.key === payload.key ? payload : task;
                })
            });

        case SIGN_OUT_SUCCESS:
            return new TasksState();

        default:
            return state;
    }

}