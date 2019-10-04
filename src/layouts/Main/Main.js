import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Sidebar, Topbar, Footer } from './components';
import { logout } from './../../actions/authentication';
import { getCity } from './../../actions/city';
import styles from './styles';

const Main = props => {
    const { children, user, logout, classes, history, citys, getCity } = props;
    useEffect(() => {
        if(citys.length === 0)
        {
            getCity();    
        }
        if(!localStorage.jwtToken)
        {
            history.push('/sign-in');
        }
    },[history, getCity, citys]);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;
    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop
            })}
        >
            <Topbar 
                onSidebarOpen={handleSidebarOpen}
                logout={logout}
            />
            <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
                logout={logout}
            />
            <main className={classes.content}>
                {children}
                { (Object.entries(user).length !== 0) ? <Footer /> : null }
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    logout: PropTypes.func
};
const mapStateToProps = state => ({
    user: state.auth.user,
    isAuth: state.auth.isAuthenticated,
    citys: state.citys,
})
export default connect(mapStateToProps, { logout, getCity })(withRouter(withStyles(styles)(Main)));
