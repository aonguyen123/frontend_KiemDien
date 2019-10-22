import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import setAuthToken from './common/setAuthToken';
import { logoutSystem } from './actions/authentication';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw: chartjs.draw
});

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decode = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
        store.dispatch(logoutSystem());
        window.location.href = '/sign-in';
    }
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Router history={browserHistory}>
                        <Routes />
                    </Router>
                </ThemeProvider>
            </Provider>
        );
    }
}
