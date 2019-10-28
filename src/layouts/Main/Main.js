import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode';
import { withStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Sidebar, Topbar, Footer } from './components';
import { getInfoAccount } from './../../actions/account';
import { logout } from './../../actions/authentication';
import styles from './styles';

const Main = props => {
    const {
        children,
        logout,
        classes,
        history,
        getInfoAccount,
        account,
    } = props;

    useEffect(() => {
        if (localStorage.jwtToken) {
            const decode = jwt_decode(localStorage.jwtToken);
            const currentTime = Date.now() / 1000;
            if (decode.exp < currentTime) {
                logout(history);
            }
        }
        if (!localStorage.jwtToken) {
            history.push('/sign-in');
        }
    });
    useEffect(() => {
        if (localStorage.jwtToken) {
            const decode = jwt_decode(localStorage.jwtToken);
            getInfoAccount(decode._id);
        }
    }, [getInfoAccount]);

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
            <Topbar onSidebarOpen={handleSidebarOpen} logout={logout} />
            <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
                logout={logout}
                account={account}
            />
            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node,
    logout: PropTypes.func
};
const mapStateToProps = state => ({
    account: state.account,
});
export default connect(
    mapStateToProps,
    { logout, getInfoAccount }
)(withRouter(withStyles(styles)(Main)));
