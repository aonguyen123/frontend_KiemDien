import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { getInfoAccount } from './../../actions/account';
import {
    updateInfoAccount,
    uploadPictureAccount,
    removePictureAccount
} from './../../actions/actionAccount';
import { closeNotify } from './../../actions/notify';
import { getCity } from './../../actions/city';
import { AccountProfile, AccountDetails } from './components';
import { LoadingCenter } from 'components';
import { Notifies } from 'components';

import styles from './styles';

const Account = props => {
    const {
        classes,
        errors,
        isLoading,
        loadingLocal,
        showNotify,
        getInfoAccount,
        account,
        actionAccount,
        updateInfoAccount,
        closeNotify,
        getCity,
        citys,
        uploadPictureAccount,
        removePictureAccount
    } = props;

    useEffect(() => {
        if(localStorage.jwtToken)
        {
            const decode = jwt_decode(localStorage.jwtToken);
            getInfoAccount(decode._id);
        }
    }, [getInfoAccount, actionAccount]);
    useEffect(() => {
        getCity();
    }, [getCity]);

    const setCloseNotify = () => {
        closeNotify();
    };

    if (isLoading) return <LoadingCenter />;
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
                <Grid item lg={4} md={6} xl={4} xs={12}>
                    <AccountProfile
                        account={account}
                        uploadPictureAccount={uploadPictureAccount}
                        removePictureAccount={removePictureAccount}
                    />
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <AccountDetails
                        account={account}
                        errors={errors}
                        getInfoAccount={getInfoAccount}
                        updateInfoAccount={updateInfoAccount}
                        citys={citys}
                        loadingLocal={loadingLocal}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = state => ({
    errors: state.errors,
    account: state.account,
    actionAccount: state.actionAccount,
    isLoading: state.isLoading.isLoading,
    loadingLocal: state.loadingLocal.loadingLocal,
    showNotify: state.showNotify.isShow,
    citys: state.citys
});
export default connect(
    mapStateToProps,
    {
        getInfoAccount,
        updateInfoAccount,
        closeNotify,
        getCity,
        uploadPictureAccount,
        removePictureAccount
    }
)(withStyles(styles)(Account));
