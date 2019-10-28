import { GET_CURRENT_ACCOUNT, FETCHING_DATA, FETCH_DATA_SUCCESS } from './../constants/types';
import callAPI from './../common/callApi';

export const getInfoAccount = idAccount => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    callAPI(`/getInfoAccount/?id=${idAccount}`, 'GET', null)
        .then(res => {
            dispatch({
                type: GET_CURRENT_ACCOUNT,
                payload: res.data
            });
            dispatch({
                type: FETCH_DATA_SUCCESS
            });
        });
};