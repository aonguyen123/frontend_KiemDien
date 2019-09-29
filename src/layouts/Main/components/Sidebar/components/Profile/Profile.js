import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { URI } from './../../../../../../constants/types';
import styles from './styles';
import { LoadingProfileSideBar } from 'components';

const Profile = props => {
    const { className, user, classes } = props;
    if (Object.entries(user).length === 0) {
        return (
            <div className={clsx(classes.root, className)}>
                <LoadingProfileSideBar />
            </div>
        );
    }
    return (
        <div className={clsx(classes.root, className)}>
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={
                    user.avatar
                        ? `${URI}/getAvatar/${user.avatar}`
                        : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                }
                to="/settings"
            />
            <Typography className={classes.name} variant="h4">
                {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography variant="body2">Administrator</Typography>
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Profile);
