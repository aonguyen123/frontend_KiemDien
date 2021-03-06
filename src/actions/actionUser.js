import {
    DELETE_USERS,
    CREATE_USER,
    GET_ERRORS,
    OPEN_NOTIFY
} from './../constants/types';
import { callAPI } from 'common';

export const deleteUsers = idUsers => dispatch => {
    callAPI('/deleteUsers', 'DELETE', { idUsers }).then(res => {
        dispatch({
            type: DELETE_USERS,
            payload: res.data
        });
        dispatch({
            type: OPEN_NOTIFY
        });
    });
};
export const createUser = user => dispatch => {
    callAPI('/createUser', 'POST', user)
        .then(res => {
            dispatch({
                type: CREATE_USER,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};