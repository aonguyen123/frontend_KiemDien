import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

import store from './store';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import setAuthToken from './common/setAuthToken';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw: chartjs.draw
});

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
}

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router history={browserHistory}>
                    <Routes />
                </Router>
            </ThemeProvider>
        </Provider>
    );
};
export default App;
