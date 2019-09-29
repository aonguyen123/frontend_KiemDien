import jwt_decode from 'jwt-decode';

import { GET_ERRORS, CLEARN_ERRORS, SET_CURRENT_USER } from './../constants/types';
import setAuthToken from './../common/setAuthToken';
import callAPI from './../common/callApi';

export const login = (user, history) => dispatch => {
    callAPI('/login', 'POST', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);            
            dispatch({
                type: SET_CURRENT_USER,
                payload: decode
            });
            dispatch({
                type: CLEARN_ERRORS,
                payload: {}
            })
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });  
};
export const logout = history => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({
        type: CLEARN_ERRORS,
        payload: {}
    });
    dispatch(setCurrentUser({}));
    history.push('/sign-in');
}
export const logoutSystem = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};
export const getInfoUser = idUser => dispatch => {
    callAPI(`/getInfoUser/?id=${idUser}`, 'GET', null)
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            });
        });
};