import {
    GET_ERRORS,
    CLEARN_ERRORS,
    ADD_ClASS,
    OPEN_NOTIFY,
    DELETE_CLASS
} from './../constants/types';
import callAPI from './../common/callApi';

export const addClass = newClass => dispatch => {
    callAPI('/createClass', 'POST', { newClass })
        .then(res => {
            dispatch({
                type: OPEN_NOTIFY
            });
            dispatch({
                type: ADD_ClASS,
                payload: res.data
            });
            dispatch({
                type: CLEARN_ERRORS,
                payload: {}
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const deleteClass = (_id, history) => dispatch => {
    callAPI('/deleteClass', 'DELETE', {_id})
        .then(res => {
            history && history.push('/classes');
            dispatch({
                type: DELETE_CLASS,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
        });
};