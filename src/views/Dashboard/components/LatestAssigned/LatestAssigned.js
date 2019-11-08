import React from 'react';
import { Link as LinkAssignes } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StatusBullet } from 'components';
import styles from './styles';

const statusColors = {
    true: 'success',
    false: 'danger'
};

const LatestOrders = props => {
    const { className, classes, assignesLatest } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader title="Latest Assigned" />
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        {assignesLatest.length !== 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Class Name</TableCell>
                                        <TableCell>Manager Person</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignesLatest.map(assigne => (
                                        <TableRow hover key={assigne._id}>
                                            <TableCell>
                                                {assigne.tenlop}
                                            </TableCell>
                                            <TableCell>
                                                {assigne.tenUser}
                                            </TableCell>
                                            <TableCell>
                                                {moment(
                                                    assigne.thoigianketthuc
                                                ).fromNow()}
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={
                                                        classes.statusContainer
                                                    }
                                                >
                                                    <StatusBullet
                                                        className={
                                                            classes.status
                                                        }
                                                        color={
                                                            statusColors[
                                                                assigne.status
                                                            ]
                                                        }
                                                        size="sm"
                                                    />
                                                    {assigne.status
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant='h5' align='center'>Assignes not found</Typography>
                        )}
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <LinkAssignes to="/assignes">
                    <Button color="primary" size="small" variant="text">
                        View all <ArrowRightIcon />
                    </Button>
                </LinkAssignes>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(LatestOrders);
