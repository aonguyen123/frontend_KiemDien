import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { ConfirmDialog } from 'components';
import EditMemberDialog from './../EditMemberDialog/EditMemberDialog';
import styles from './styles';

const TableToolBar = props => {
    const {
        selectedMember,
        selectedMssv,
        classes,
        member,
        idClass,
        errors,
        editClassMemberById,
        clearErrors,
        deleteClassMemberById
    } = props;
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickEdit = () => {
        setOpen(true);
    };
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleCloseDialog = params => {
        setOpen(params);
    };
    const closeConfirm = params => {
        setOpenConfirm(params);
    };
    const handleClickDelete = () => {
        deleteClassMemberById(idClass, selectedMember, selectedMssv);
    };
    return (
        <React.Fragment>
            <ConfirmDialog
                open={openConfirm}
                closeDialog={closeConfirm}
                deleteConfirm={handleClickDelete}
                title="Delete class member"
            />
            <EditMemberDialog
                open={open}
                handleCloseDialog={handleCloseDialog}
                member={member}
                idClass={idClass}
                errors={errors}
                editClassMemberById={editClassMemberById}
                clearErrors={clearErrors}
            />
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: selectedMember.length > 0
                })}
            >
                {selectedMember.length > 0 && (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                    >
                        {selectedMember.length} selected
                    </Typography>
                )}

                {selectedMember.length === 1 && (
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" onClick={handleClickEdit}>
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                )}

                {selectedMember.length > 0 && (
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
export default withStyles(styles)(TableToolBar);
