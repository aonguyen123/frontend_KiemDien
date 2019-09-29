import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AccountProfile, AccountDetails } from './components';
import { LoadingCenter } from './../../components';
import styles from './styles';
import { getInfoUser } from './../../actions/authentication';
import { uploadPicture, updateInfo, removePicture } from './../../actions/account';
import { getCity } from './../../actions/city';
import { Notifies } from './../../components';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotifies: false
        };
    }
    setShowNotifies = params => {
        this.setState({
            showNotifies: params
        });
    }
    componentDidMount() {
        this.props.getCity();
    }
    componentDidUpdate(preProps)
    {
        if(preProps.info !== this.props.info)
        {
            this.setState({
                showNotifies: true
            });
        }
    }
    render() {
        const {
            errors,
            user,
            classes,
            file,
            isAuth,
            getInfoUser,
            uploadPicture,
            citys,
            info,
            updateInfo,
            statusUpdateInfo,
            removePicture
        } = this.props;
        const { showNotifies } = this.state;
        if (Object.entries(user).length === 0) {
            return <LoadingCenter />;
        }
        return (
            <div className={classes.root}>
                {
                    (showNotifies) ? <Notifies variant="success" message={statusUpdateInfo} /> : null
                }                    
                <Grid container spacing={4}>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <AccountProfile
                            errors={errors}
                            user={user}
                            file={file}
                            isAuth={isAuth}
                            getInfoUser={getInfoUser}
                            uploadPicture={uploadPicture}
                            removePicture={removePicture}
                        />
                    </Grid>
                    <Grid item lg={8} md={6} xl={8} xs={12}>
                        <AccountDetails
                            user={user}
                            citys={citys}
                            info={info}
                            updateInfo={updateInfo}
                            errors={errors}
                            getInfoUser={getInfoUser}
                            setShowNotifies={params => this.setShowNotifies(params)}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
};
Account.propTypes = {
    errors: PropTypes.object,
    user: PropTypes.object
};
const mapStateToProps = state => ({
    errors: state.errors,
    user: state.auth.user,
    file: state.file,
    isAuth: state.auth.isAuthenticated,
    citys: state.citys,
    info: state.info.user,
    statusUpdateInfo: state.info.status
});
export default connect(
    mapStateToProps,
    { getInfoUser, uploadPicture, getCity, updateInfo, removePicture }
)(withStyles(styles)(Account));
