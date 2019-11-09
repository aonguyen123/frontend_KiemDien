import moment from 'moment';
import { STATISTICAL_TOTAL_CLASS } from '../constants/types';

const initialState = {
    dataClassMonthCurrent: [],
    dataClassMonthLast: []
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case STATISTICAL_TOTAL_CLASS:
            return {
                ...state,
                dataClassMonthCurrent: xuly(action.payload.classes).lopsMonthCurrent,
                dataClassMonthLast: xuly(action.payload.classes).lopsMonthLast
            }
        default:
            return state;
    }
}; 
const xuly = classes => {
    let lopsMonthCurrent = [], lopsMonthLast = [];
    const month = moment().format('MM');
    const lastMonth = moment().subtract(1, 'month').format('MM');
    if(classes.length !== 0)
    {
        lopsMonthCurrent = classes.filter(lop => moment(lop.createdAt).format('MM') === month);
        lopsMonthLast = classes.filter(lop => moment(lop.createdAt).format('MM') === lastMonth);
    }
    return {
        lopsMonthCurrent,
        lopsMonthLast
    }
}