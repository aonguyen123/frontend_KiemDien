import axios from 'axios';
import { URI } from './../constants/types';

export default function callAPI(endPoint, method = 'GET', body) {
    return axios({
        method,
        url: `${URI}${endPoint}`,
        data: body
    })
}
