import { GET_PRESENCES_DETAIL, FETCHING_DATA, FETCH_DATA_SUCCESS, CLEARN_ERRORS } from './../constants/types';
import { callAPI } from 'common';

export const getPresencesDetail = (id, history) => dispatch => {
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
    const dataPresencesDetail = await callAPI(`/getPresencesDetail/?id=${id}`, 'GET', null)
    .catch(err => {
        history.push('/internal-server-error');    
    });
    if(dataPresencesDetail)
    {
        dispatch({
            type: GET_PRESENCES_DETAIL,
            payload: dataPresencesDetail.data
        });
    }
    dispatch({
        type: FETCH_DATA_SUCCESS
    });
};