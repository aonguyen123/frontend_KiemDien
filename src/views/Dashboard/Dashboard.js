import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    LatestSales,
    UsersByDevice,
    LatestProducts,
    LatestOrders
} from './components';
import { closeNotify } from './../../actions/notify';
import { Notifies } from 'components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Dashboard = props => {
    const { auth, showNotify, closeNotify } = props;
    const classes = useStyles();

    const setCloseNotify = () => {
        closeNotify();
    };

    return (
        <div className={classes.root}>
            <Notifies
                variant={auth.isSuccess ? 'success' : 'error'}
                message={auth.message}
                openNotify={auth.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <Grid container spacing={4}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Budget />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalUsers />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TasksProgress />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalProfit />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestSales />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <UsersByDevice />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <LatestProducts />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestOrders />
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = state => ({
    auth: state.auth,
    showNotify: state.showNotify.isShow
});
export default connect(mapStateToProps, { closeNotify })(Dashboard);