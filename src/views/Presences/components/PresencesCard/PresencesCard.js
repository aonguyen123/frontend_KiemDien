import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    Link,
    Divider,
    Avatar,
    Button
} from '@material-ui/core';
import { StatusBullet } from 'components';
import { URI } from './../../../../constants/types';
import styles from './styles';

const statusColors = {
    true: 'success',
    false: 'danger'
};

const PresencesCard = props => {
    const { className, classes, match, lop } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar
                        src={
                            lop.hinhdaidien
                                ? `${URI}/getAvatar/${lop.hinhdaidien}`
                                : 'http://www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=retro'
                        }
                    />
                }
                title={<Typography variant="h5">{lop.tenlop}</Typography>}
                subheader={lop.checkDate ? 
                    <Typography variant="body2">
                        by{' '}
                        <span style={{ fontWeight: 'bold', fontSize: '15' }}>
                            {lop.tenUser}
                        </span>
                        {' '} | {`checked ${moment(lop.checkDate).fromNow()}`}
                    </Typography>
                    :
                    <Typography variant="body2">
                        by{' '}
                        <span style={{ fontWeight: 'bold', fontSize: '15' }}>
                            {lop.tenUser}
                        </span>
                        {' '} | not check
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography variant="h6">
                                    {moment(lop.thoigianketthuc).fromNow()}
                                </Typography>
                                <Typography variant="body2">
                                    End Time
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {moment(lop.thoigianbatdau).format(
                                        'DD/MM/YYYY'
                                    )}
                                </Typography>
                                <Typography variant="body2">
                                    Start date
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div className={classes.statusContainer}>
                                    <StatusBullet
                                        className={classes.status}
                                        color={statusColors[lop.status]}
                                        size="sm"
                                    />
                                    <Typography variant="h6">
                                        {lop.status ? 'Active' : 'Inactive'}
                                    </Typography>
                                </div>
                                <Typography variant="body2">Status</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography variant="h6">
                                    {lop.dssv.length}
                                </Typography>
                                <Typography variant="body2">
                                    Total member
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {moment(lop.thoigianketthuc).format(
                                        'DD/MM/YYYY'
                                    )}
                                </Typography>
                                <Typography variant="body2">
                                    End date
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link
                                    color="primary"
                                    component={RouterLink}
                                    to={`${match.path}/presencesDetail/${lop._id}`}
                                    underline="none"
                                    variant="h6"
                                >
                                    <Button color="primary" variant="outlined">
                                        {'View'}
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(PresencesCard);
