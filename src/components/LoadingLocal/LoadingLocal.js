import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const LoadingLocal = props => {
    const { size, classes } = props;
    return (
        <div className={classes.loadingCenterCard}>
            <CircularProgress  
                size={size}
                color="secondary"
            />                
        </div>
    );
};
export default withStyles(styles)(LoadingLocal);
