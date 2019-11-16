import React, { useState, forwardRef } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Slide
} from '@material-ui/core';
import Draggable from 'react-draggable';
import { LoadingButton } from 'components';

const PaperComponent = props => {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

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
                TransitionComponent={Transition}
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
