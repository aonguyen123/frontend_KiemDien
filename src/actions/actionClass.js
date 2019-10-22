import {
    GET_ERRORS,
    CLEARN_ERRORS,
    ADD_ClASS,
    OPEN_NOTIFY,
    UPDATE_INFO_CLASS_BY_ID,
    UPDATE_AVATAR_CLASS_BY_ID,
    REMOVE_AVATAR_CLASS_BY_ID
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
export const updateInfoClassById = newClass => dispatch => {
    callAPI('/updateInfoClass', 'PUT', newClass)
        .then(res => {
            dispatch({
                type: OPEN_NOTIFY
            });
            dispatch({
                type: UPDATE_INFO_CLASS_BY_ID,
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
        })
};
export const updateAvatarClassById = (file, _id) => dispatch => {
    const formData = new FormData();
    formData.set('_id', _id);
    formData.append('avatar', file);
    callAPI('/updateAvatarClassById', 'POST', formData)
        .then(res => {
            dispatch({
                type: OPEN_NOTIFY
            });
            dispatch({
                type: UPDATE_AVATAR_CLASS_BY_ID,
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
        })
};
export const removeAvatarClass = _id => dispatch => {
    callAPI('/removeAvatarClassById', 'DELETE', {_id})
        .then(res => {
            dispatch({
                type: REMOVE_AVATAR_CLASS_BY_ID,
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