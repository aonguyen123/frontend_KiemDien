import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Link,
    Avatar
} from '@material-ui/core';
import moment from 'moment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link as LinkClasses } from 'react-router-dom';
import { ConfirmDialog } from 'components';
import { URI } from './../.../../../../../constants/types';
import styles from './styles';

const LatestClasses = props => {
    const { className, classes, classLatest, deleteClass } = props;
    const [idClass, setIdClass] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const closeDialog = params => {
        setOpenDialog(params);
    };
    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setIdClass(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteClass = () => {
        deleteClass(idClass, null);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <ConfirmDialog
                open={openDialog}
                closeDialog={closeDialog}
                title="Delete class"
                deleteConfirm={handleDeleteClass}
            />
            <CardHeader title="Latest classes" />
            <Divider />
            <CardContent className={classes.content}>
                <List>
                    {classLatest.length !== 0
                        ? classLatest.map((lop, i) => (
                              <ListItem
                                  divider={i < classLatest.length - 1}
                                  key={lop._id}
                              >
                                  <ListItemAvatar>
                                      <Avatar
                                          alt="ClassImg"
                                          className={classes.image}
                                          src={
                                              lop.hinhdaidien
                                                  ? `${URI}/getAvatar/${lop.hinhdaidien}`
                                                  : 'http://www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=retro'
                                          }
                                      />
                                  </ListItemAvatar>
                                  <ListItemText
                                      primary={lop.tenlop}
                                      secondary={`Created ${moment(
                                          lop.createdAt
                                      ).fromNow()}`}
                                  />
                                  <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={e => handleClick(e, lop._id)}
                                  >
                                      <MoreVertIcon />
                                  </IconButton>
                              </ListItem>
                          ))
                        : 'Class Not found'}
                </List>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <Typography variant="button">
                            <Link
                                color="textPrimary"
                                component={LinkClasses}
                                to={`/classes/classDetail/${idClass}`}
                                underline="none"
                                variant="h6"
                            >
                                {'View detail'}
                            </Link>
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography variant="button" onClick={handleOpenDialog}>
                            Delete
                        </Typography>
                    </MenuItem>
                </Menu>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <LinkClasses to="/classes">
                    <Button color="primary" size="small" variant="text">
                        View all <ArrowRightIcon />
                    </Button>
                </LinkClasses>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(LatestClasses);
