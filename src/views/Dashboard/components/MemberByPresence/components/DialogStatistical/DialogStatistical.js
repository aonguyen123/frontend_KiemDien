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
    IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import startOfWeek from 'date-fns/startOfWeek';
import isSameDay from 'date-fns/isSameDay';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import isWithinInterval from 'date-fns/isWithinInterval';
import isValid from 'date-fns/isValid';
import styles from './styles';

const DialogStatistical = props => {
    const { open, handleCloseDialog, classes, filterStatistical } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleClose = () => {
        handleCloseDialog(false);
        setSelectedDate(new Date());
    };
    const handleClick = event => {
        event.preventDefault();
        //console.log(selectedDate);
    }
    const handleDateChange = date => {
        if (filterStatistical === 0) {
            setSelectedDate(startOfWeek(date));
        } else {
            setSelectedDate(date);
        }
    };
    const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        let dateClone = date;
        let selectedDateClone = selectedDate;

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);
        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

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
            ? `Week of ${format(startOfWeek(dateClone), 'MMM do')}`
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
                                filterStatistical === 0
                                    ? 'Statistical by week'
                                    : filterStatistical === 1
                                    ? 'Statistical by month'
                                    : 'Statistical by year'
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={1}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item md={12} xs={12}>
                                        {filterStatistical === 0 ? (
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
                                                disableFuture
                                            />
                                        ) : filterStatistical === 1 ? (
                                            <DatePicker
                                                inputVariant="outlined"
                                                openTo="month"
                                                views={['year', 'month']}
                                                label="Choose month"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                disableFuture
                                            />
                                        ) : (
                                            <DatePicker
                                                inputVariant="outlined"
                                                views={['year']}
                                                label='Choose year'
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                disableFuture
                                            />
                                        )}
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
