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
    const {
        selectedMember,
        selectedMssv,
        classes,
        deletePresenceMember,
        idClass
    } = props;
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const closeConfirm = params => {
        setOpenConfirm(params);
    };
    const handleClickDelete = () => {
        deletePresenceMember(idClass, selectedMember, selectedMssv);
    };

    return (
        <React.Fragment>
            <ConfirmDialog
                open={openConfirm}
                closeDialog={closeConfirm}
                deleteConfirm={handleClickDelete}
                title="Delete member"
            />
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: selectedMember.length > 0
                })}
            >
                {selectedMember.length > 0 ? (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                    >
                        {selectedMember.length} selected
                    </Typography>
                ) : (
                    <Typography
                        className={classes.title}
                        variant="h5"
                        id="tableTitle"
                    >
                        All member
                    </Typography>
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
export default withStyles(styles)(ToolbarTable);
