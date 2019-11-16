import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardHeader,
    Avatar,
    Typography,
    CardContent,
    Divider,
    CardActions,
    Tooltip,
    Grid,
    Link,
    Fab
} from '@material-ui/core';
import moment from 'moment';
import { URI } from './../../../../constants/types';
import DrawClassAssignes from './../DrawClassAssignes/DrawClassAssignes';
import { LoadingButton } from 'components';
import ChangeIcon from '@material-ui/icons/Cached';
import RemoveIcon from '@material-ui/icons/Remove';
import { truncateString } from 'common';
import styles from './styles';

const CardClassAssignes = props => {
    const {
        classes,
        className,
        lop,
        loadingLocal,
        changeManagerPerson,
        users,
        removeManagerPerson,
        searchTaskDraw,
        clearnTaskDraw
    } = props;
    const [state, setState] = useState({ right: false });
    const [loadingButton, setLoadingButton] = useState(false);

    const handleChangePerson = (side, open) => event => {
        clearnTaskDraw();
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const handleClickRemovePerson = () => {
        setLoadingButton(true);
        removeManagerPerson(lop._id);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <DrawClassAssignes
                open={state.right}
                handleChangePerson={handleChangePerson}
                changeManagerPerson={changeManagerPerson}
                loadingLocal={loadingLocal}
                users={users}
                idClass={lop._id}
                searchTaskDraw={searchTaskDraw}
            />
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
                subheader={
                    lop.tenUser ? (
                        <Typography variant="body2">
                            by{' '}
                            <span style={{ fontWeight: 'bold', fontSize: 15 }}>
                                {lop.tenUser}
                            </span>{' '}
                            | {`Updated ${moment(lop.updatedAt).fromNow()}`}
                        </Typography>
                    ) : (
                        <Typography variant="body2">
                            {`Updated ${moment(lop.updatedAt).fromNow()}`}
                        </Typography>
                    )
                }
            />
            <CardContent>
                <div className={classes.content}>
                    <Typography variant="body1" color="textSecondary">
                        {truncateString(lop.mota, 45, true)}
                    </Typography>
                </div>
                <Link
                    color="textPrimary"
                    component={RouterLink}
                    to={`/classes/classDetail/${lop._id}`}
                    underline="none"
                    variant="button"
                >
                    Learn more
                </Link>
            </CardContent>
            <Divider />
            <div className={classes.info}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h5" color="textPrimary">
                            {lop.dssv.length}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Total member
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" color="textPrimary">
                            {moment(lop.thoigianketthuc).fromNow()}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            End time
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" color="textPrimary">
                            {lop.managed ? 'Managed' : 'Not managed'}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                        >
                            Status
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <CardActions>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item>
                        <Tooltip title="Change person" placement="top">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="add"
                                className={classes.margin}
                                onClick={handleChangePerson('right', true)}
                            >
                                <ChangeIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Remove person" placement="top">
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="add"
                                className={classes.margin}
                                disabled={!lop.managed || loadingButton}
                                onClick={handleClickRemovePerson}
                            >
                                {loadingButton && <LoadingButton />}
                                <RemoveIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(CardClassAssignes);
