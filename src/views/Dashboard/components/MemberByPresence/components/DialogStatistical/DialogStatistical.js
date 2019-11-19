import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    IconButton,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import moment from 'moment';
import isValid from 'date-fns/isValid';
import styles from './styles';

const DialogStatistical = props => {
    const { open, handleCloseDialog, classes, index, getDateFilter } = props;
    const [selectedDate, setSelectedDate] = useState(
        moment(new Date()).startOf('isoWeek')
    );

    const handleClose = () => {
        handleCloseDialog(false);
        if (index === 1) {
            setSelectedDate(moment(new Date()).startOf('isoWeek'));
        } else {
            setSelectedDate(new Date());
        }
    };
    const handleClick = event => {
        event.preventDefault();
        getDateFilter(selectedDate, index);
        handleCloseDialog(false);
        setSelectedDate(moment(new Date()).startOf('isoWeek'));
    };
    const handleDateChange = date => {
        if (index === 1) {
            setSelectedDate(moment(date).startOf('isoWeek'));
        } else {
            setSelectedDate(date);
        }
    };
    const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        let dateClone = date;
        let selectedDateClone = selectedDate;

        const start = moment(selectedDateClone).startOf('isoWeek');
        const end = moment(selectedDateClone).endOf('isoWeek');
        const dayIsBetween = moment(dateClone).isBetween(
            start,
            end,
            null,
            '[]'
        );

        const isFirstDay = moment(dateClone).isSame(start, 'isoWeek');
        const isLastDay = moment(dateClone).isSame(end, 'isoWeek');

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]:
                !dayInCurrentMonth && dayIsBetween
        });
        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(dateClone, 'd')} </span>
                </IconButton>
            </div>
        );
    };
    const formatWeekSelectLabel = (date, invalidLabel) => {
        let dateClone = date;

        return dateClone && isValid(dateClone)
            ? `Week of ${moment(dateClone).format('MMM Do')}`
            : invalidLabel;
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
                        <CardHeader
                            title={
                                index === 1
                                    ? 'Statistical by week'
                                    : index === 0
                                    ? 'Statistical by month'
                                    : 'Statistical by year'
                            }
                        />
                        <Divider />
                        <CardContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container spacing={1}>
                                    <Grid item md={12} xs={12}>
                                        {index === 1 ? (
                                            <DatePicker
                                                inputVariant="outlined"
                                                label="Choose week"
                                                onChange={handleDateChange}
                                                fullWidth
                                                value={selectedDate}
                                                margin="dense"
                                                renderDay={renderWrappedWeekDay}
                                                labelFunc={
                                                    formatWeekSelectLabel
                                                }
                                                orientation="landscape"
                                                disableFuture
                                            />
                                        ) : index === 0 ? (
                                            <DatePicker
                                                inputVariant="outlined"
                                                openTo="month"
                                                views={['year', 'month']}
                                                label="Choose month"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                disableFuture
                                                orientation="landscape"
                                            />
                                        ) : (
                                            <DatePicker
                                                inputVariant="outlined"
                                                views={['year']}
                                                label="Choose year"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                disableFuture
                                            />
                                        )}
                                    </Grid>
                                    {index === 1 ? (
                                        <Grid item md={12} xs={12}>
                                            <Typography variant="body2">
                                                {moment(selectedDate).startOf('isoWeek').format('DD/MM/YYYY')}
                                                {'  '}---{' '}
                                                {moment(selectedDate).endOf('isoWeek').format('DD/MM/YYYY')}
                                            </Typography>
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </MuiPickersUtilsProvider>
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
                                >
                                    OK
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
export default withStyles(styles)(DialogStatistical);
