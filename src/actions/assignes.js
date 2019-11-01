import { GET_CLASS_ASSIGNES, FETCHING_DATA, FETCH_DATA_SUCCESS } from './../constants/types';
import callAPI from './../common/callApi';

export const getClassAssignes = () => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    callAPI('/getClassAssignes', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_CLASS_ASSIGNES,
                payload: res.data
            });
            dispatch({
                type: FETCH_DATA_SUCCESS
            });
        });
};