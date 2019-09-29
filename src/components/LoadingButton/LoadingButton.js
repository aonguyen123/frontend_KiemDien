import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

const ButtonLoading = props => {
    const { classes } = props;
    return (
        <CircularProgress
            size={24}
            className={classes.buttonProgress}
            color="secondary"
        />
    );
};
ButtonLoading.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(ButtonLoading);
