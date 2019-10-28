import {
    GET_CLASSES,
    GET_ERRORS,
    GET_CLASS_BY_ID,
    FETCHING_DATA,
    FETCH_DATA_SUCCESS    
} from './../constants/types';
import callAPI from './../common/callApi';

export const getClasses = () => dispatch => {    
    dispatch({
        type: FETCHING_DATA
    });
    callAPI('/getClasses', 'GET', null).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        });
        dispatch({
            type: FETCH_DATA_SUCCESS
        });
    });
};
export const getClassById = id => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    callAPI(`/getClassById/${id}`, 'GET', null)
        .then(res => {
            dispatch({
                type: GET_CLASS_BY_ID,
                payload: res.data
            });    
            dispatch({
                type: FETCH_DATA_SUCCESS
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch({
                type: FETCH_DATA_SUCCESS
            });
        });
};
