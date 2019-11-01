import React from 'react';
import { HashLoader } from 'react-spinners';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const LoadingCenter = props => {
    const {classes} = props;
    return (
        <div className={classes.progress}>
            <HashLoader
                sizeUnit={'px'}
                size={50}
                color={'#36D7B7'}
            />
        </div>
    );
};
export default withStyles(styles)(LoadingCenter);