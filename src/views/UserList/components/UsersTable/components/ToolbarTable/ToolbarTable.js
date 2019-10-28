import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import { ConfirmDialog } from 'components';

import styles from './styles';

const ToolbarTable = props => {
    const { selectedUsers, classes, deleteUsers } = props;
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleClickDelete = () => {
        deleteUsers(selectedUsers);
    }
    const closeConfirm = params => {
        setOpenConfirm(params);
    };
    return (
        <React.Fragment>
            <ConfirmDialog
                open={openConfirm}
                closeDialog={closeConfirm}
                deleteConfirm={handleClickDelete}
                title="Delete user"
            />
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: selectedUsers.length > 0
                })}
            >
                {
                    selectedUsers.length > 0 
                    ?
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                    >
                        {selectedUsers.length} selected
                    </Typography>
                    : 
                    <Typography className={classes.title} variant="h5" id="tableTitle">
                        All users
                    </Typography>
                }
                {selectedUsers.length > 0 && (
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={handleOpenConfirm}
                        >
                            <DeleteIcon color="secondary" />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </React.Fragment>
    );
};
export default withStyles(styles)(ToolbarTable);
