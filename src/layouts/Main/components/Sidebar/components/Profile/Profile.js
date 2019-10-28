import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { URI } from './../../../../../../constants/types';
import styles from './styles';
import { LoadingLocal } from 'components';

const Profile = props => {
    const { className, classes, account } = props;

    return (
        <div className={clsx(classes.root, className)}>
            {
                Object.entries(account).length === 0 ? <LoadingLocal size={20} />
                :
                <Fragment>
                    <Avatar
                        alt="Person"
                        className={classes.avatar}
                        component={RouterLink}
                        src={
                            account.avatar
                                ? `${URI}/getAvatar/${account.avatar}`
                                : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                        }
                        to="/settings"
                    />
                    <Typography className={classes.name} variant="h4">
                        {`${account.firstName} ${account.lastName}`}
                    </Typography>
                    <Typography variant="body2">Administrator</Typography>
                </Fragment>
            }
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Profile);
