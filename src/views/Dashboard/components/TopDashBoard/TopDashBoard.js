import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const data = [
    [22, 'Working late'],
    [18, 'Good evening'],
    [12, 'Good afternoon'],
    [5, 'Good morning'],
    [0, 'Whoa, early bird']
];
const TopDashBoard = props => {
    const { classes, account } = props;

    const getStatus = data => {
        let status;
        const hr = new Date().getHours();
        for (let i = 0; i < data.length; i++) {
            if (hr >= data[i][0]) {
                status = data[i][1];
                break;
            }
        }
        return status;
    };

    return (
        <Fragment>
            <Typography variant="h3" color="textPrimary" className={classes.textHeader}>
                {getStatus(data)}, {`${account.firstName} ${account.lastName}`}
            </Typography>
            <Typography variant="body1" className={classes.textBody}>
                Here's what's happening
            </Typography>
        </Fragment>
    );
};
export default withStyles(styles)(TopDashBoard);
