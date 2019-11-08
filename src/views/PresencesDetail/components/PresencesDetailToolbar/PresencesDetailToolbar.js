import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Typography, Fab } from '@material-ui/core';
import ExportIcon from '@material-ui/icons/ArrowUpward';
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
                <Typography variant="subtitle1">
                    {objClass.mota}
                </Typography>
            </div>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="export"
                    className={classes.margin}
                >
                    <ExportIcon className={classes.exportIcon} />
                    Export
                </Fab>
            </div>
        </div>
    );
};
export default withRouter(withStyles(styles)(ToolBarClassDetail));
