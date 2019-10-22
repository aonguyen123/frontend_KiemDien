import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Typography, Chip, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmDialog } from 'components';
import styles from './styles';

const ToolBarClassDetail = props => {
    const { classes, className, classById } = props;
    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => {
        setOpen(true)
    };
    const closeDialog = params => {
        setOpen(params);
    }
    return (
        <div className={clsx(classes.root, className)}>
            <ConfirmDialog 
                open={open}
                closeDialog={closeDialog}
                title="Delete class"
            />
            <Typography variant="overline">class detail</Typography>
            <div className={classes.title}>
                <Typography variant="h3">{`${classById.tenlop} (${classById.malop})`}</Typography>
            </div>
            <div className={classes.row}>
                <Chip
                    variant="outlined"
                    size="small"
                    label={classById.status ? 'active class' : 'inactive class'}
                    className={classById.status ? classes.outlinedPrimary : classes.outlinedSecondary}
                />
                <Chip
                    variant="outlined"
                    size="small"
                    label={classById.managed ? 'managed' : 'not yet managed'}
                    className={classById.managed ? classes.outlinedPrimary : classes.outlinedSecondary}
                />
                <span className={classes.spacer} />
                <Fab
                    color="secondary"
                    aria-label="delete"
                    className={classes.fab}
                    onClick={handleOpenDialog}
                >
                    <DeleteIcon />
                </Fab>
            </div>
        </div>
    );
};
export default withStyles(styles)(ToolBarClassDetail);
