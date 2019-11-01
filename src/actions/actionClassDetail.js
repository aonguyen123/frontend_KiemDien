import {
    GET_ERRORS,
    CLEARN_ERRORS,
    OPEN_NOTIFY,
    UPDATE_INFO_CLASS_BY_ID,
    UPDATE_AVATAR_CLASS_BY_ID,
    REMOVE_AVATAR_CLASS_BY_ID,
    IMPORT_DSSV_CLASS_BY_ID,
    ADD_CLASS_MEMBER_BY_ID,
    EDIT_CLASS_MEMBER_BY_ID,
    DELETE_CLASS_MEMBER_BY_ID,
    CHANGE_MANAGER_PERSON,
    REMOVE_MANAGER_PERSON
} from './../constants/types';
import callAPI from './../common/callApi';

export const importDssvClassById = (dssv, _id) => dispatch => {
    const formData = new FormData();
    formData.set('_id', _id);
    formData.append('dssvClass', dssv);
    callAPI('/importDssvClassById', 'POST', formData)
        .then(res => {
            dispatch({
                type: IMPORT_DSSV_CLASS_BY_ID,
                payload: res.data
            })
            dispatch({
                type: OPEN_NOTIFY
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const removeAvatarClass = _id => dispatch => {
    callAPI('/removeAvatarClassById', 'DELETE', {_id})
        .then(res => {
            dispatch({
                type: REMOVE_AVATAR_CLASS_BY_ID,
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
            });
        });
};
export const updateAvatarClassById = (file, _id) => dispatch => {
    const formData = new FormData();
    formData.set('_id', _id);
    formData.append('avatar', file);
    callAPI('/updateAvatarClassById', 'POST', formData)
        .then(res => {
            dispatch({
                type: UPDATE_AVATAR_CLASS_BY_ID,
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
            });
        })
};
export const updateInfoClassById = newClass => dispatch => {
    callAPI('/updateInfoClass', 'PUT', newClass)
        .then(res => {
            dispatch({
                type: UPDATE_INFO_CLASS_BY_ID,
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
        })
};
export const addClassMemberById = (_id, newMember) => dispatch => {
    callAPI('/addClassMemberById', 'POST', {_id, newMember})
        .then(res => {
            dispatch({
                type: ADD_CLASS_MEMBER_BY_ID,
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
export const editClassMemberById = (idClass, member) => dispatch => {
    callAPI('/editMemberClassById', 'PUT', {idClass, member})
        .then(res => {
            dispatch({
                type: EDIT_CLASS_MEMBER_BY_ID,
                payload: res.data
            })
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
            })
        })
};
export const deleteClassMemberById = (idClass, members) => dispatch => {
    callAPI('/deleteClassMemberById', 'DELETE', {idClass, members})
        .then(res => {
            dispatch({
                type: DELETE_CLASS_MEMBER_BY_ID,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
        })
};
export const changeManagerPerson = (idUser, idClass) => dispatch => {
    callAPI('/changeManagerPerson', 'POST', {idUser, idClass})
        .then(res => {
            dispatch({
                type: CHANGE_MANAGER_PERSON,
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
            dispatch({
                type: OPEN_NOTIFY
            })
        });
};
export const removeManagerPerson = idClass => dispatch => {
    callAPI('/removeManagerPerson', 'PUT', {idClass})
        .then(res => {
            dispatch({
                type: REMOVE_MANAGER_PERSON,
                payload: res.data
            });
            dispatch({
                type: OPEN_NOTIFY
            });
        })
};