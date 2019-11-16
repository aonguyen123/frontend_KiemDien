import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import styles from './styles';

const ToolBarClassDetail = props => {
    const { classes, className, presenceDetailClass } = props;

    const objClass = presenceDetailClass.classById;

    return (
        <div className={clsx(classes.root, className)}>
            <Typography variant="overline">presence detail</Typography>
            <div className={classes.title}>
                <Typography variant="h3">{objClass.tenlop}</Typography>
            </div>
            <div className={classes.title}>
                <Typography variant="subtitle1">{objClass.mota}</Typography>
            </div>
        </div>
    );
};
export default withRouter(withStyles(styles)(ToolBarClassDetail));
