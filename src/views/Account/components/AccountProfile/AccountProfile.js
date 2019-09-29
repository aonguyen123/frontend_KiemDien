import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from '@material-ui/core';
import { URI } from './../../../../constants/types';
import styles from './styles';
import { LoadingButton } from './../../../../components';

class AccountProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            isLoadingButtonUpload: false,
            isLoadingButtonRemove: false,
            showErrorFile: false
        };
    }
    profileComplete = (user, isAuth) => {
        if (isAuth) {
            let complete = 0;
            if (user.firstName) {
                complete += 20;
            }
            if (user.lastName) {
                complete += 20;
            }
            if (user.sdt) {
                complete += 20;
            }
            if (user.city) {
                complete += 20;
            }
            if (user.avatar) {
                complete += 20;
            }
            return complete;
        } else {
            return 0;
        }
    };
    handleRemoveAvatar = (user) => {
        this.setState({
            isLoadingButtonRemove: true
        });
        this.props.removePicture(user._id);
    }
    handleChange = (e, user) => {
        let file = this.state.avatar;
        file = e.target.files[0];
        if (file) {
            this.setState({
                isLoadingButtonUpload: true
            });
            this.props.uploadPicture(file, user._id);
        }
    };
    componentDidUpdate(preProps, preState)
    {
        if(preProps.file !== this.props.file)
        {
            this.props.getInfoUser(this.props.user._id);
        }
        if (preProps.user !== this.props.user) {
            this.setState({
                isLoadingButtonUpload: false,
                isLoadingButtonRemove: false,
                showErrorFile: false,
                avatar: ''
            });
        }
        if (preProps.errors !== this.props.errors) {
            this.setState({
                isLoadingButtonUpload: false,
                isLoadingButtonRemove: false,
                showErrorFile: true,
                avatar: ''
            });
        }
    }
    render() {
        const { className, user, isAuth, classes, errors } = this.props;
        const { isLoadingButtonUpload, showErrorFile, isLoadingButtonRemove } = this.state;
        return (
            <Card className={clsx(classes.root, className)}>
                <CardContent>
                    <div className={classes.details}>
                        <div>
                            <Typography gutterBottom variant="h2">
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {user.city}, {user.country}
                            </Typography>
                            <Typography
                                className={classes.dateText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {moment().format('hh:mm A')} ({'GTM-7'})
                            </Typography>
                        </div>
                        <Avatar
                            className={classes.avatar}
                            src={
                                user.avatar
                                    ? `${URI}/getAvatar/${user.avatar}`
                                    : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                            }
                        />
                    </div>
                    <div className={classes.progress}>
                        <Typography variant="body1">
                            {`Profile Completeness: ${this.profileComplete(
                                user,
                                isAuth
                            )}%`}
                        </Typography>
                        <LinearProgress
                            value={this.profileComplete(user, isAuth)}
                            variant="determinate"
                        />
                    </div>
                    <div className={classes.showError}>
                        { 
                            showErrorFile 
                            ? <Typography variant="subtitle2" color="secondary">{errors.status}</Typography>
                            : null
                        }
                    </div>
                </CardContent>
                <Divider />
                <CardActions>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="text-button-file"
                        multiple
                        type="file"
                        onChange={e => this.handleChange(e, user)}
                        disabled={isLoadingButtonUpload ? true : false}
                        value=""
                    />
                    <label htmlFor="text-button-file">
                        <Button
                            component="span"
                            className={classes.uploadButton}
                            color="primary"
                            variant="text"
                            disabled={isLoadingButtonUpload ? true : false}
                        >
                            {isLoadingButtonUpload && <LoadingButton />}
                            Upload avatar
                        </Button>
                    </label>
                    <Button 
                        variant="text" 
                        onClick={() => this.handleRemoveAvatar(user)}
                        disabled={isLoadingButtonRemove ? true : false}
                    >
                        {isLoadingButtonRemove && <LoadingButton />}
                        Remove avatar
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

AccountProfile.propTypes = {
    className: PropTypes.string,
    auth: PropTypes.object,
    uploadPicture: PropTypes.func,
    file: PropTypes.string,
    errors: PropTypes.object
};

export default withStyles(styles)(AccountProfile);
