import {
    GET_USERS,
    FETCHING_DATA,
    FETCH_DATA_SUCCESS,
    GET_USER_CONDITION_STATUS_TRUE,
    LOADING_LOCAL,
    LOADING_LOCAL_SUCCESS
} from './../constants/types';
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
export const getUserConditionStatusTrue = () => dispatch => {
    dispatch({
        type: LOADING_LOCAL
    });
    callAPI('/getUserConditionStatusTrue', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_USER_CONDITION_STATUS_TRUE,
                payload: res.data
            })
            dispatch({
                type: LOADING_LOCAL_SUCCESS
            });
        });
};
