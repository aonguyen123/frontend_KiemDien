import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';
import styles from './styles';

const Footer = props => {
    const { className, classes } = props;

    return (
        <div className={clsx(classes.root, className)}>
            <Typography variant="body1">
                &copy;{' '}
                <Link component="a" href="https://aonguyen.now.sh/" target="_blank">
                    Tran Vi Lap
                </Link>
                . {new Date().getFullYear()}
            </Typography>
        </div>
    );
};

Footer.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Footer);
