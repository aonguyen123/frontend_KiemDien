import { GET_CLASS_PRESENCES, FETCHING_DATA, FETCH_DATA_SUCCESS, CLEARN_ERRORS } from './../constants/types';
import { callAPI } from 'common';

export const getClassPresences = () => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    });
    getData(dispatch);
};
const getData = async dispatch => {
    const dataClassPresences = await callAPI('/getClassPresences', 'GET', null);
    dispatch({
        type: GET_CLASS_PRESENCES,
        payload: dataClassPresences.data
    });
    dispatch({
        type: FETCH_DATA_SUCCESS
    });
}