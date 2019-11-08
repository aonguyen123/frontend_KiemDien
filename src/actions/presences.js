import { GET_CLASS_PRESENCES, FETCHING_DATA, FETCH_DATA_SUCCESS } from './../constants/types';
import callAPI from './../common/callApi';

export const getClassPresences = () => dispatch => {
    dispatch({
        type: FETCHING_DATA
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