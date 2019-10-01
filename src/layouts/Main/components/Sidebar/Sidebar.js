import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

import { getInfoUser } from './../../../../actions/authentication';
import { Profile, SidebarNav } from './components';
import styles from './styles';

const Sidebar = props => {
    const { open, variant, onClose, className, logout, user, classes, getInfoUser } = props;
    React.useEffect(() => {
        if(localStorage.jwtToken)
        {
            const decode = jwt_decode(localStorage.jwtToken);
            getInfoUser(decode._id);
        }
    },[getInfoUser]);
    const pages = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />
        },
        {
            title: 'Users',
            href: '/users',
            icon: <PeopleIcon />
        },
        {
            title: 'Classes',
            href: '/classes',
            icon: <ClassRoundedIcon />
        },
        {
            title: 'Typography',
            href: '/typography',
            icon: <TextFieldsIcon />
        },
        {
            title: 'Icons',
            href: '/icons',
            icon: <ImageIcon />
        },
        {
            title: 'Account',
            href: '/account',
            icon: <AccountBoxIcon />
        },
        {
            title: 'Settings',
            href: '/settings',
            icon: <SettingsIcon />
        }
    ];

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div className={clsx(classes.root, className)}>
                <Profile
                    user={user}
                />
                <Divider className={classes.divider} />
                <SidebarNav className={classes.nav} pages={pages} logout={logout} />                
            </div>
        </Drawer>
    );
};

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, { getInfoUser })(withStyles(styles)(Sidebar));
