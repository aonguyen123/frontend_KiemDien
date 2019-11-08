import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ClassIcon from '@material-ui/icons/Class';
import styles from './styles';

const handling = totalClass => {
    const currentMonth = totalClass.dataClassMonthCurrent.length;
    const lastMonth = totalClass.dataClassMonthLast.length;
    if (currentMonth > lastMonth) {
        return true;
    }
    return false;
};
const count = totalClass => {
    const currentMonth = totalClass.dataClassMonthCurrent.length;
    const lastMonth = totalClass.dataClassMonthLast.length;
    let percentMonthCurrent = (currentMonth / (currentMonth + lastMonth)) * 100;
    let percentMonthLast = (lastMonth / (lastMonth + currentMonth)) * 100;

    if (percentMonthCurrent > percentMonthLast) {
        let rs = percentMonthCurrent - percentMonthLast;
        const n = parseFloat(rs);
        rs = Math.round(n * 10) / 10;
        return rs;
    } else {
        let rs = percentMonthLast - percentMonthCurrent;
        const n = parseFloat(rs);
        rs = Math.round(n * 10) / 10;
        return rs;
    }
};
const TotalClasses = props => {
    const { className, classes, totalClass } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            TOTAL CLASSES
                        </Typography>
                        <Typography variant="h3">
                            {totalClass.dataClassMonthCurrent.length}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <ClassIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    {handling(totalClass) ? (
                        <ArrowUpwardIcon
                            className={classes.differenceIconSuccess}
                        />
                    ) : (
                        <ArrowDownwardIcon className={classes.differenceIcon} />
                    )}
                    <Typography
                        className={
                            handling(totalClass)
                                ? classes.differenceValueSuccess
                                : classes.differenceValue
                        }
                        variant="body2"
                    >
                        {count(totalClass)}%
                    </Typography>
                    <Typography className={classes.caption} variant="caption">
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(TotalClasses);
