import { GET_CITYS } from './../constants/types';
import callAPI from './../common/callApi';

export const getCity = () => dispatch => {
    callAPI('/getCity', 'GET', null)
        .then(res => {
            dispatch({
                type: GET_CITYS,
                payload: res.data
            });
        });
};