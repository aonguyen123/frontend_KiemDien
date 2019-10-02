import { GET_USERS, DELETE_USERS } from './../constants/types';
import callAPI from './../common/callApi';

export const getUsers = () => dispatch => {
    callAPI('/getUsers', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
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