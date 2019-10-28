import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Divider,
    Button,
    Avatar,
    ListItem,
    ListItemText,
    CardHeader
} from '@material-ui/core';
import { URI } from './../../../../constants/types';
import styles from './styles';

const CardManage = props => {
    const { classes, className, userOfClass } = props;
    return (
        <Card className={clsx(classes.root, className)}>
            {Object.entries(userOfClass).length !== 0 ? (
                <CardHeader
                    avatar={
                        <Avatar
                            src={
                                userOfClass.avatar 
                                ? `${URI}/getAvatar/${userOfClass.avatar}` 
                                : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                            }
                        />
                    }
                    title={
                        <Typography variant="overline">
                            class manager person
                        </Typography>
                    }
                    subheader={
                        <Typography variant="h5">{userOfClass.name}</Typography>
                    }
                />
            ) : null}
            <Divider />
            {Object.entries(userOfClass).length !== 0 ? (
                <CardContent>
                    <ListItem className={classes.cardManageList}>
                        <ListItemText>
                            <div className={classes.row}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Phone
                                </Typography>
                                <span className={classes.spacer} />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {userOfClass.sdt}
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider component="div" />
                    <ListItem className={classes.cardManageList}>
                        <ListItemText>
                            <div className={classes.row}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    BirthDay
                                </Typography>
                                <span className={classes.spacer} />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {userOfClass.ngaysinh}
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider component="div" />
                    <ListItem className={classes.cardManageList}>
                        <ListItemText>
                            <div className={classes.row}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Gender
                                </Typography>
                                <span className={classes.spacer} />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {userOfClass.gioitinh ? 'Nam' : 'Nữ'}
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider component="div" />
                    <ListItem className={classes.cardManageList}>
                        <ListItemText>
                            <div className={classes.row}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Email
                                </Typography>
                                <span className={classes.spacer} />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {userOfClass.email}
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider component="div" />
                    <ListItem className={classes.cardManageList}>
                        <ListItemText>
                            <div className={classes.row}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Registration date
                                </Typography>
                                <span className={classes.spacer} />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {userOfClass.ngaydangki}
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider component="div" />
                </CardContent>
            ) : (
                <div className={classes.managerNotFound}>
                    <Typography variant="body1" align="center">Manager not found</Typography>
                </div>
            )}
            <Divider />
            <CardActions>
                <Button
                    variant="text"
                    className={classes.changeButton}
                    color="primary"
                >
                    Change person
                </Button>
                <Button variant="text" color="secondary">
                    Remove person
                </Button>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(CardManage);
