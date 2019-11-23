import {
    GET_CLASSES,
    GET_CLASS_BY_ID,
    FETCHING_DATA,
    FETCH_DATA_SUCCESS,
    CLEARN_ERRORS    
} from './../constants/types';
import { callAPI } from 'common';

export const getClasses = () => dispatch => {    
    dispatch({
        type: FETCHING_DATA
    });
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
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
export const getClassById = (id, history) => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    });
    getData(id, history, dispatch);
};
const getData = async (id, history, dispatch) => {
    const dataClassDetail = await callAPI(`/getClassById/${id}`, 'GET', null)
    .catch(err => {
        if(err.response.data.status === 'ID_WRONG')
        {
            history.push('/internal-server-error');
        }
    });
    if(dataClassDetail)
    {
        dispatch({
            type: GET_CLASS_BY_ID,
            payload: dataClassDetail.data
        });
    }
    dispatch({
        type: FETCH_DATA_SUCCESS
    });
};