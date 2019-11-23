import {
    GET_CURRENT_ACCOUNT,
    FETCHING_DATA,
    FETCH_DATA_SUCCESS,
    CLEARN_ERRORS
} from './../constants/types';
import { callAPI } from 'common';

export const getInfoAccount = idAccount => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    })
    callAPI(`/getInfoAccount/?id=${idAccount}`, 'GET', null).then(res => {
        dispatch({
            type: GET_CURRENT_ACCOUNT,
            payload: res.data
        });
        dispatch({
            type: FETCH_DATA_SUCCESS
        });
    });
};
export const getInfoAccountSideBar = idAccount => dispatch => {
    callAPI(`/getInfoAccount/?id=${idAccount}`, 'GET', null).then(res => {
        dispatch({
            type: GET_CURRENT_ACCOUNT,
            payload: res.data
        });
    });
};
