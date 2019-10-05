import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { Notifications, Password } from './components';
import styles from './styles';
import { updatePassword } from './../../actions/account';
import { Notifies } from 'components';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNotify: false
        };
    }
    setCloseNotify = params => {
        this.setState({
            openNotify: params
        });
    }
    componentDidUpdate(preProps)
    {
        if(preProps.info !== this.props.info)
        {
            this.setState({
                openNotify: true
            })
        }
    }
    render() {
        const {
            classes,
            updatePassword,
            user,
            statusUpdateInfo,
            errors,
            info
        } = this.props;
        const { openNotify } = this.state;
        return (
            <div className={classes.root}>
                <Notifies 
                    openNotify={openNotify}
                    setCloseNotify={params => this.setCloseNotify(params)}
                    variant="success" 
                    message={statusUpdateInfo} 
                />
                <Grid container spacing={4}>
                    <Grid item md={7} xs={12}>
                        <Notifications />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Password
                            user={user}
                            updatePassword={updatePassword}
                            errors={errors}
                            info={info}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    statusUpdateInfo: state.info.status,
    user: state.auth.user,
    info: state.info.user,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { updatePassword }
)(withStyles(styles)(Settings));
