import React, { forwardRef } from 'react';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
    List,
    ListItem,
    Button,
    Hidden,
    Divider
} from '@material-ui/core';
import InputRoundedIcon from '@material-ui/icons/InputRounded';
import styles from './styles';

const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
        <RouterLink {...props} />
    </div>
));

const SidebarNav = props => {
    const { pages, className, classes, logout, history } = props;

    const handleClick = () => {
        logout(history);
    };
    return (
        <List className={clsx(classes.root, className)}>
            {pages.map(page => (
                <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                >
                    <Button
                        activeClassName={classes.active}
                        className={classes.button}
                        component={CustomRouterLink}
                        to={page.href}
                    >
                        <div className={classes.icon}>{page.icon}</div>
                        {page.title}
                    </Button>
                </ListItem>
            ))}
            <Hidden lgUp>
                <Divider absolute className={classes.divider} />
                <Button
                    className={classes.buttonLogout}
                    onClick={handleClick}
                >
                    <div className={classes.icon}>
                        <InputRoundedIcon />
                    </div>
                    {'Logout'}
                </Button>
            </Hidden>
        </List>
    );
};

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired
};

export default withRouter(withStyles(styles)(SidebarNav));
