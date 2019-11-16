import { GET_ERRORS, LOG_IN, LOG_OUT } from './../constants/types';
import { callAPI, setAuthToken } from 'common';

export const login = (account, history) => dispatch => {
    callAPI('/login', 'POST', {account})
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch({
                type: LOG_IN
            });
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
        type: LOG_OUT
    });
    history.push('/sign-in');
}