import moment from 'moment';
import { STATISTICAL_TOTAL_USER } from './../constants/types';

const initialState = {
    dataUserMonthCurrent: [],
    dataUserMonthLast: []
};
export default function(state = initialState, action) {
    switch(action.type)
    {
        case STATISTICAL_TOTAL_USER:
            return {
                ...state,
                dataUserMonthCurrent: xuly(action.payload.users).usersMonthCurrent,
                dataUserMonthLast: xuly(action.payload.users).usersMonthLast
            }
        default:
            return state;
    }
};
const xuly = users => {
    let usersMonthCurrent = [], usersMonthLast = [];
    const month = moment().format('MM');
    const lastMonth = moment().subtract(1, 'month').format('MM');
    if(users.length !== 0)
    {
        usersMonthCurrent = users.filter(user => moment(user.createdAt).format('MM') === month);
        usersMonthLast = users.filter(user => moment(user.createdAt).format('MM') === lastMonth);
    }
    return {
        usersMonthCurrent,
        usersMonthLast
    }
};