import { CLEARN_ERRORS } from './../constants/types';

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    });
};