import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
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
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LoadingButton } from 'components';
import moment from 'moment';
import styles from './styles';

const CardClassDetail = props => {
    const { classes, className, classById, updateInfoClassById, errors } = props;
    const [value, setValue] = useState(classById)
    const [loadingButton, setLoadingButton] = useState(false);
    const [errDate, setErrDate] = useState(false);

    useEffect(() => {
        if(errors)
        {
            setLoadingButton(false);
        }
    }, [errors]);
    const handleDateStartChange = date => {
        setValue({
            ...value,
            thoigianbatdau: date
        })
    };
    const handleDateEndChange = date => {
        setValue({
            ...value,
            thoigianketthuc: date
        })
    };
    const handleTimeChange = date => {
        setValue({
            ...value,
            giobatdau: date
        })
    };
    const handleChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }
    const handleClick = e => {
        e.preventDefault();
        if(!moment(value.thoigianbatdau).isBefore(value.thoigianketthuc))
        {
            setErrDate(true);
        }
        else
        {
            setErrDate(false);
            setLoadingButton(true);
            updateInfoClassById(value);
        }
    };
    return (
        <Card className={clsx(classes.root, className)}>
            <form autoComplete="off" noValidate>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Class code"
                                    margin="dense"
                                    name="malop"
                                    variant="outlined"
                                    disabled
                                    required
                                    value={value.malop}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Class name"
                                    margin="dense"
                                    name="tenlop"
                                    required
                                    variant="outlined"
                                    value={value.tenlop}
                                    onChange={handleChange}
                                    error={errors.tenlop ? true : false}
                                    helperText = {
                                        errors.tenlop ? errors.tenlop : null
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <DatePicker
                                    inputVariant="outlined"
                                    label="Start date"
                                    value={value.thoigianbatdau}
                                    format="dd/MM/yyyy"
                                    onChange={handleDateStartChange}
                                    fullWidth
                                    minDate={value.thoigianbatdau}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <DatePicker
                                    inputVariant="outlined"
                                    label="End date"
                                    value={value.thoigianketthuc}
                                    format="dd/MM/yyyy"
                                    onChange={handleDateEndChange}
                                    fullWidth
                                    minDate={moment(value.thoigianbatdau).add(1, 'days')}
                                    margin="dense"
                                    error={errDate}
                                    helperText={
                                        errDate ? 'Date should not be before minimal date' : null
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TimePicker
                                    inputVariant="outlined"
                                    margin="dense"
                                    id="time-picker"
                                    label="Start time"
                                    value={value.giobatdau}
                                    onChange={handleTimeChange}
                                    fullWidth
                                    ampm={false}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    margin="dense"
                                    name="mota"
                                    required
                                    variant="outlined"
                                    multiline
                                    rows="5"
                                    value={value.mota}
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
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained"
                        onClick={handleClick}
                        disabled={loadingButton}
                    >
                        {loadingButton ? <LoadingButton /> : null}
                        Save details
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};
export default withStyles(styles)(CardClassDetail);
