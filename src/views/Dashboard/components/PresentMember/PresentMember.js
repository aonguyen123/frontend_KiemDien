import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
    LinearProgress
} from '@material-ui/core';
import PresentIcon from '@material-ui/icons/Spellcheck';
import styles from './styles';
import { getData } from './statistical';

const PresentMember = props => {
    const { className, classes, DataByPresences, ...rest } = props;

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            PRESENT MEMBER
                        </Typography>
                        <Typography variant="h3">{getData(DataByPresences)}%</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PresentIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <LinearProgress
                    className={classes.progress}
                    value={getData(DataByPresences)}
                    variant="determinate"
                />
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(PresentMember);
