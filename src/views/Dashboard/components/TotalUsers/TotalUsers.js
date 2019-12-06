import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import styles from './styles';

const handling = totalUser => {
    const currentMonth = totalUser.dataUserMonthCurrent.length;
    const lastMonth = totalUser.dataUserMonthLast.length;
    if (currentMonth > lastMonth) {
        return true;
    }
    return false;
};
const count = totalUser => {
    const currentMonth = totalUser.dataUserMonthCurrent.length;
    const lastMonth = totalUser.dataUserMonthLast.length;
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
const TotalUsers = props => {
    const { className, classes, totalUser } = props;

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
                            TOTAL USERS
                        </Typography>
                        <Typography variant="h3">{totalUser.dataUserMonthCurrent.length}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    {handling(totalUser) ? (
                        <ArrowUpwardIcon
                            className={classes.differenceIcon}
                        />
                    ) : (
                        <ArrowDownwardIcon className={classes.differenceIconError} />
                    )}
                    <Typography
                        className={handling(totalUser) ? classes.differenceValue : classes.differenceValueError}
                        variant="body2"
                    >
                        {count(totalUser)}%
                    </Typography>
                    <Typography className={classes.caption} variant="caption">
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(TotalUsers);
