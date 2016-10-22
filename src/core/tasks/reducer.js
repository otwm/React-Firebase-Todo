import {List, Record} from "immutable";
import {SIGN_OUT_SUCCESS} from "src/core/auth";
import {CREATE_TASK_SUCCESS, DELETE_TASK_SUCCESS, FILLTER_TASK, LOAD_TASKS, UPDATE_TASK_SUCCESS} from "./action-types";

export const TasksState = new Record({
    deleted: null,
    filter: '',
    list: new List(),
    previous: null
});

export function tasksReducer(state = new TasksState(),
    {payload, type}) {
    switch (type) {
        case CREATE_TASK_SUCCESS:
            return state.merge({
                deleted: null,
                previous: null,
                list: state.deleted && state.deleted.key === payload.key ?
                    state.previous :
                    state.list.unshift(payload)
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