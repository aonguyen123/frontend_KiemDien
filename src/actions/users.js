import { GET_USERS, FETCHING_DATA, FETCH_DATA_SUCCESS } from './../constants/types';
import callAPI from './../common/callApi';

export const getUsers = () => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    callAPI('/getUsers', 'GET', null).then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
        dispatch({
            type: FETCH_DATA_SUCCESS
        });
    });
};