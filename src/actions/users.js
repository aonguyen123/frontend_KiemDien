import { GET_USERS, DELETE_USERS, CREATE_USER, GET_ERRORS, CLEARN_ERRORS, CLEAR_STATUS_DELETE } from './../constants/types';
import callAPI from './../common/callApi';

export const getUsers = () => dispatch => {
    callAPI('/getUsers', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
            dispatch({
                type: CLEAR_STATUS_DELETE,
                payload: '' 
            });
        })
};
export const deleteUsers = ids => dispatch => {
    callAPI('/deleteUsers', 'DELETE', {ids})
        .then(res => {
            dispatch({
                type: DELETE_USERS,
                payload: res.data
            });
        })  
};
export const createUser = user => dispatch => {
    callAPI('/createUser', 'POST', user)
        .then(res => {
            dispatch({
                type: CREATE_USER,
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
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    });
};