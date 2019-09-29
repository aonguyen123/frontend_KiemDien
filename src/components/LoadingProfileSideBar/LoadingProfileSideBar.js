import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingProfileSideBar = () => {
    return (
        <CircularProgress  
            size={20}
            color="secondary"
        />
    );
};
export default LoadingProfileSideBar;
