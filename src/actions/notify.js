import { CLOSE_NOTIFY } from './../constants/types';

export const closeNotify = () => dispatch => {
    dispatch({
        type: CLOSE_NOTIFY
    });
};