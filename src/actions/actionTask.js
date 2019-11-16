import {
    SEARCH_TASK,
    FILTER_TASK,
    CLEARN_TASK,
    SEARCH_TASK_DRAW,
    CLEARN_TASK_DRAW
} from './../constants/types';

export const searchTask = keyword => dispatch => {
    dispatch({
        type: SEARCH_TASK,
        payload: keyword
    });
};
export const filterTask = index => dispatch => {
    dispatch({
        type: FILTER_TASK,
        payload: index
    });
};
export const searchTaskDraw = keyword => dispatch => {
    dispatch({
        type: SEARCH_TASK_DRAW,
        payload: keyword
    });
};
export const clearnTaskDraw = () => dispatch => {
    dispatch({
        type: CLEARN_TASK_DRAW,
        payload: ''
    });
};
export const clearnTask = () => dispatch => {
    dispatch({
        type: CLEARN_TASK,
        payload: ''
    });
};