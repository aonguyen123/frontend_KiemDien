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
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';

import { LoadingButton } from 'components';
import styles from './styles';

const EditMemberDialog = props => {
    const { open, handleCloseDialog, classes, member, idClass, errors, editClassMemberById, clearErrors } = props;    
    const [value, setValue] = useState(member);
    const [loadingButton, setLoadingButton] = useState(false);
    const today = moment();
    
    useEffect(() => {
        setValue(member);
    }, [member])
    useEffect(() => {
        setLoadingButton(false);
    }, [errors]);

    const handleDateChangeDate = date => {
        setValue({
            ...value,
            ngaysinh: moment(date).format('DD/MM/YYYY')
        })
    };
    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    const handleClose = () => {
        handleCloseDialog(false);
        clearErrors();
    };
    const handleClick = e => {        
        e.preventDefault();
        setLoadingButton(true);
        editClassMemberById(idClass, value);
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
                        <CardHeader title="Edit member" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={1}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Member code"
                                            margin="dense"
                                            name="mssv"
                                            value={value.mssv}
                                            variant="outlined"
                                            required
                                            onChange={handleChange}
                                            error={errors.mssv ? true : false}
                                            helperText={
                                                errors.mssv ? errors.mssv : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Member name"
                                            margin="dense"
                                            name="ten"
                                            value={value.ten}
                                            required
                                            variant="outlined"
                                            onChange={handleChange}
                                            error={errors.ten ? true : false}
                                            helperText={
                                                errors.ten ? errors.ten : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <DatePicker
                                            inputVariant="outlined"
                                            label="Birth date"
                                            format="dd/MM/yyyy"
                                            onChange={handleDateChangeDate}
                                            fullWidth
                                            value={moment(value.ngaysinh, 'DD/MM/YYYY')}
                                            maxDate={today}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Gender
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="gioitinh"
                                                name="gioitinh"
                                                value={value.gioitinh}
                                                onChange={handleChange}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="Nam"
                                                    control={
                                                        <Radio color="secondary" />
                                                    }
                                                    label="Male"
                                                    labelPlacement="start"
                                                />
                                                <FormControlLabel
                                                    value="Nữ"
                                                    control={
                                                        <Radio color="secondary" />
                                                    }
                                                    label="Female"
                                                    labelPlacement="start"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </MuiPickersUtilsProvider>
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
                                    color="primary"
                                    onClick={handleClick}
                                    disabled={loadingButton}
                                >
                                    Update
                                    {loadingButton ? <LoadingButton /> : null}
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
export default withStyles(styles)(EditMemberDialog);
