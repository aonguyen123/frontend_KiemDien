import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MemberIcon from '@material-ui/icons/CardMembership';
import styles from './styles';

const TotalMember = props => {
    const { className, classes, totalMember } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="inherit"
                            gutterBottom
                            variant="body2"
                        >
                            TOTAL MEMBER
                        </Typography>
                        <Typography color="inherit" variant="h3">
                            {totalMember.totalMember}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MemberIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(TotalMember);
