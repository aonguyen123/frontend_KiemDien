import { 
    UPLOAD_PICTURE, GET_ERRORS, UPDATE_INFO, REMOVE_PICTURE, UPDATE_PASSWORD,
    CLEARN_ERRORS
} from './../constants/types';
import callAPI from './../common/callApi';

export const uploadPicture = (file, idUser) => dispatch => {
    const formData = new FormData();
    formData.set('idUser', idUser);
    formData.append('avatar', file);
    callAPI('/updateAvatar', 'POST', formData)
        .then(res => {
            const filePath = res.data.filePath;
            const fileName= filePath.split('/')[1];
            dispatch({
                type: UPLOAD_PICTURE,
                payload: fileName
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const removePicture = idUser => dispatch => {
    callAPI('/removeAvatar', 'PUT', {idUser})
        .then(res => {
            dispatch({
                type: REMOVE_PICTURE,
                payload: res.data.success
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
export const updateInfo = user => dispatch => {
    callAPI('/updateInfo', 'PUT', user)
        .then(res => {
            dispatch({
                type: UPDATE_INFO,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const updatePassword = user => dispatch => {
    callAPI('/updatePassword', 'PUT', {user})
        .then(res => {
            dispatch({
                type: UPDATE_PASSWORD,
                payload: res.data
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