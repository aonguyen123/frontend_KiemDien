import { GET_USERS } from './../constants/types';
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