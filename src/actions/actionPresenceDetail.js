import { DELETE_PRESENCES_MEMBER, OPEN_NOTIFY } from './../constants/types';
import { callAPI } from 'common';

export const deletePresenceMember = (idClass, members, listMssv) => dispatch => {
    dataDelete(idClass, members, listMssv, dispatch);
};
const dataDelete = async (idClass, members, listMssv, dispatch) => {
    const dataDelete = await callAPI('/deletePresenceMember', 'DELETE', {idClass, members, listMssv});
    dispatch({
        type: DELETE_PRESENCES_MEMBER,
        payload: dataDelete.data
    });
    dispatch({
        type: OPEN_NOTIFY
    });
};