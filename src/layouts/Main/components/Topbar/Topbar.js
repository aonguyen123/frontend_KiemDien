import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    Hidden,
    IconButton,
    Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

import styles from './styles';

const Topbar = props => {
    const { className, onSidebarOpen, logout, classes } = props;

    const handleClick = () => {
        logout(props.history);
    };
    return (
        <AppBar className={clsx(classes.root, className)}>
            <Toolbar>
                <RouterLink to="/">
                    <img alt="Logo" src="/images/logos/logo--white.svg" />
                </RouterLink>
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <Tooltip title='Sign out'>
                        <IconButton
                            className={classes.signOutButton}
                            color="inherit"
                            onClick={handleClick}
                        >
                            <InputIcon />
                        </IconButton>
                    </Tooltip>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
    logout: PropTypes.func
};

export default withRouter(withStyles(styles)(Topbar));
