import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const Minimal = props => {
    const { children, classes } = props;

    return (
        <div className={classes.root}>
            <main className={classes.content}>{children}</main>
        </div>
    );
};

Minimal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default withStyles(styles)(Minimal);
