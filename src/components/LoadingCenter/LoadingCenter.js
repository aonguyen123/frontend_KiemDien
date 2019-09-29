import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

const LoadingCenter = props => {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} color="secondary" />
        </div>
    );
};
export default withStyles(styles)(LoadingCenter);
