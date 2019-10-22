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
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LoadingButton } from 'components';
import styles from './styles';
import moment from 'moment';

const DialogAddClass = props => {
    const { open, handleCloseDialog, classes, addClass, actionClass, errors, clearErrors } = props;
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const [selectedDateEnd, setSelectedDateEnd] = useState(endDate);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [value, setValue] = useState({
        tenlop: '',
        mota: ''
    });
    const [loadingButton, setLoadingButton] = useState(false);
    const [errDate, setErrDate] = useState(false);

    const today = moment();

    const handleTimeChange = date => {
        setSelectedTime(date);
    };
    const handleDateChangeDateStart = date => {
        setSelectedDateStart(date);
        //setSelectedDateEnd(date + 1);
    };
    const handleDateChangeDateEnd = date => {
        setSelectedDateEnd(date);
    };
    const handleClose = () => {
        setValue({
            tenlop: '',
            mota: ''
        })
        handleCloseDialog(false);
        clearErrors();
    };
    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    const handleClickAddClass = e => {
        e.preventDefault();
        if(!moment(selectedDateStart).isBefore(selectedDateEnd))
        {
            setErrDate(true);
        }
        else
        {
            setErrDate(false);
            setLoadingButton(true);
            const newClass = {};
            newClass.tenlop = value.tenlop;
            newClass.mota = value.mota;
            newClass.giobatdau = selectedTime;
            newClass.thoigianbatdau = selectedDateStart;
            newClass.thoigianketthuc = selectedDateEnd;
            addClass(newClass);
        }
    };
    useEffect(() => {
        if(actionClass.status === 'ADD_CLASS_SUCCESS')
        {
            setLoadingButton(false);
        }
        if(errors)
        {
            setLoadingButton(false);
        }
    }, [actionClass, errors]);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
        >
            <div className={classes.root}>
                <Card>
                    <form autoComplete="off" noValidate>
                        <CardHeader title="Add class" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Class name"
                                            margin="dense"
                                            name="tenlop"
                                            variant="outlined"
                                            required
                                            onChange={handleChange}
                                            error={errors.tenlop ? true : false}
                                            helperText = {
                                                errors.tenlop ? errors.tenlop : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TimePicker
                                            inputVariant="outlined"
                                            margin="dense"
                                            id="time-picker"
                                            label="Start time"
                                            ampm={false}
                                            fullWidth
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <DatePicker
                                            inputVariant="outlined"
                                            label="Start date"
                                            format="dd/MM/yyyy"
                                            onChange={handleDateChangeDateStart}
                                            fullWidth
                                            value={selectedDateStart}
                                            minDate={today}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <DatePicker
                                            inputVariant="outlined"
                                            label="End date"
                                            format="dd/MM/yyyy"
                                            onChange={handleDateChangeDateEnd}
                                            fullWidth
                                            value={selectedDateEnd}
                                            minDate={moment(selectedDateStart).add(1, 'days')}
                                            error={errDate}
                                            helperText={
                                                errDate ? 'Date should not be before minimal date' : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            margin="dense"
                                            name="mota"
                                            required
                                            variant="outlined"
                                            multiline
                                            rows="3"
                                            onChange={handleChange}
                                            error={errors.mota ? true : false}
                                            helperText = {
                                                errors.mota ? errors.mota : null
                                            }
                                        />
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
                                    onClick={handleClickAddClass}
                                    disabled={loadingButton ? true : false}
                                >
                                    Save
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
export default withStyles(styles)(DialogAddClass);
