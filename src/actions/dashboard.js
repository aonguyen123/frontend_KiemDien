import {
    GET_CLASS_LATEST,
    FETCHING_DATA,
    FETCH_DATA_SUCCESS,
    GET_ASSIGNES_LATEST,
    STATISTICAL_TOTAL_CLASS,
    STATISTICAL_TOTAL_USER,
    STATISTICAL_TOTAL_MEMBER
} from './../constants/types';
import callAPI from './../common/callApi';

export const getDataDashBoard = () => dispatch => {
    dispatch({
        type: FETCHING_DATA
    });
    getData(dispatch);
};

const getData = async dispatch => {
    const dataClassLatest = await callAPI('/getClassLatest', 'GET', null);
    dispatch({
        type: GET_CLASS_LATEST,
        payload: dataClassLatest.data.classes
    });
    const dataAssignesLatest = await callAPI('/getAssignesLatest', 'GET', null);
    dispatch({
        type: GET_ASSIGNES_LATEST,
        payload: dataAssignesLatest.data
    });
    const dataClassStatistical = await callAPI('/statisticalTotalClass', 'GET', null);
    dispatch({
        type: STATISTICAL_TOTAL_CLASS,
        payload: dataClassStatistical.data
    });
    const dataUserStatistical = await callAPI('/statisticalUserTotal', 'GET', null);
    dispatch({
        type: STATISTICAL_TOTAL_USER,
        payload: dataUserStatistical.data
    });
    const dataTotalMember = await callAPI('/statisticalTotalMember', 'GET', null);
    dispatch({
        type: STATISTICAL_TOTAL_MEMBER,
        payload: dataTotalMember.data
    });
    dispatch({
        type: FETCH_DATA_SUCCESS
    });
}