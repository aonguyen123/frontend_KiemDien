import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const DialogAddUser = props => {
    const { open, handleCloseDialog, classes } = props;

    const handleClose = () => {
        handleCloseDialog(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title"
                >
                    Add user
                </DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="dense"
                                    name="firstName"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    margin="dense"
                                    name="firstName"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default withStyles(styles)(DialogAddUser);
