import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { Notifications, Password } from './components';
import { updatePassword } from './../../actions/actionAccount';
import { closeNotify } from './../../actions/notify';
import { Notifies } from 'components';
import styles from './styles';


const Settings = props => {
    const { classes, updatePassword, actionAccount, showNotify, closeNotify, errors, account } = props;

    const setCloseNotify = () => {
        closeNotify();
    };
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionAccount.isSuccess ? 'success' : 'error'}
                message={actionAccount.message}
                openNotify={
                    actionAccount.isSuccess === null ? false : showNotify
                }
                setCloseNotify={setCloseNotify}
            />
            <Grid container spacing={4}>
                <Grid item md={7} xs={12}>
                    <Notifications />
                </Grid>
                <Grid item md={5} xs={12}>
                    <Password
                        updatePassword={updatePassword}
                        errors={errors}
                        account={account}
                        actionAccount={actionAccount}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = state => ({
    account: state.account,
    actionAccount: state.actionAccount,
    showNotify: state.showNotify.isShow,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { updatePassword, closeNotify }
)(withStyles(styles)(Settings));