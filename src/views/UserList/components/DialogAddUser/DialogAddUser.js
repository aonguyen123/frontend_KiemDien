import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
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
import { LoadingButton } from 'components';
import styles from './styles';

const DialogAddUser = props => {
    const { open, handleCloseDialog, classes, createUser, errors, addUser, clearErrors } = props;
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [loadingButton, SetLoadingButton] = useState(false);
    useEffect(() => {
        if(Object.entries(errors).length > 0)
        {
            SetLoadingButton(false);
        }
        if(Object.entries(addUser).length > 0)
        {
            SetLoadingButton(false);
        }
    },[SetLoadingButton, errors, addUser, handleCloseDialog]);
    const handleClose = () => {
        handleCloseDialog(false);
        clearErrors();
    };
    const handleChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };
    const handleClick = () => {
        SetLoadingButton(true);
        createUser(value);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
        >
            <div className={classes.root}>
                <Card>
                    <form autoComplete="off" noValidate>
                        <CardHeader title="Add user" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        variant="outlined"
                                        required
                                        onChange={handleChange}
                                        error={errors.email ? true : false}
                                        helperText={
                                            errors.email ? errors.email : null
                                        }
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        margin="dense"
                                        name="password"
                                        variant="outlined"
                                        required
                                        type="password"
                                        onChange={handleChange}
                                        error={errors.password ? true : false}
                                        helperText={
                                            errors.password ? errors.password : null
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end"
                            >
                                <Button 
                                    type="submit"
                                    onClick={handleClick} 
                                    color="primary"
                                    disabled={loadingButton ? true : false}
                                >
                                    { 
                                       loadingButton ? <LoadingButton /> : null
                                    }
                                    Save
                                </Button>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                            </Grid>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </Dialog>
    );
};
export default withStyles(styles)(DialogAddUser);
