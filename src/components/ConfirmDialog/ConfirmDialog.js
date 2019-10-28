import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { LoadingButton } from 'components';

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const ConfirmDialog = props => {
    const { open, closeDialog, title, deleteConfirm } = props;
    const [loadingButton, setLoadingButton] = useState(false);

    const handleClose = () => {
        closeDialog(false);
    };
    const handleClick = () => {
        setLoadingButton(true);
        deleteConfirm();
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title"
                >
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="secondary" 
                        disabled={loadingButton}
                        onClick={handleClick}
                    >
                        {loadingButton ? <LoadingButton /> : null}
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ConfirmDialog;
