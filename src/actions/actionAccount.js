import { 
    UPLOAD_PICTURE_ACCOUNT, GET_ERRORS, UPDATE_INFO_ACCOUNT, REMOVE_PICTURE_ACCOUNT, UPDATE_PASSWORD_ACCOUNT,
    CLEARN_ERRORS, OPEN_NOTIFY
} from './../constants/types';
import callAPI from './../common/callApi';

export const updateInfoAccount = account => dispatch => {
    callAPI('/updateInfoAccount', 'PUT', {account})
        .then(res => {
            dispatch({
                type: UPDATE_INFO_ACCOUNT,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
            dispatch({
                type: CLEARN_ERRORS,
                payload: {}
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const uploadPictureAccount = (file, idAccount) => dispatch => {
    const formData = new FormData();
    formData.set('idAccount', idAccount);
    formData.append('avatar', file);
    callAPI('/updateAvatarAccount', 'POST', formData)
        .then(res => {
            dispatch({
                type: UPLOAD_PICTURE_ACCOUNT,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const removePictureAccount = idAccount => dispatch => {
    callAPI('/removeAvatarAccount', 'PUT', {idAccount})
        .then(res => {
            dispatch({
                type: REMOVE_PICTURE_ACCOUNT,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
export const updatePassword = (idAccount, password) => dispatch => {
    callAPI('/updatePasswordAccount', 'PUT', {idAccount, password})
        .then(res => {
            dispatch({
                type: UPDATE_PASSWORD_ACCOUNT,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
            dispatch({
                type: CLEARN_ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};