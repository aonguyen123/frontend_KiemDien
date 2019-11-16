import { GET_CITYS, LOADING_LOCAL_SUCCESS, LOADING_LOCAL } from './../constants/types';
import { callAPI } from 'common';

export const getCity = () => dispatch => {
    dispatch({
        type: LOADING_LOCAL
    });
    callAPI('/getCitys', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_CITYS,
                payload: res.data
            });
            dispatch({
                type: LOADING_LOCAL_SUCCESS
            });
        });
};