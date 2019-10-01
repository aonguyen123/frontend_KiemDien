import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';
import { ToolbarTable } from './components';
import styles from './styles';

const UsersTable = props => {
    const { className, users, classes } = props;

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [page, setPage] = useState(0);

    const handleSelectAll = event => {
        const { users } = props;
        let selectedUsers;
        if (event.target.checked) {
            selectedUsers = users.map(user => user._id);
        } else {
            selectedUsers = [];
        }
        console.log(selectedUsers);
        setSelectedUsers(selectedUsers);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }
        console.log(newSelectedUsers);
        setSelectedUsers(newSelectedUsers);
    };

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    const handleRowsPerPageChange = event => {
        setRowsPerPage(event.target.value);
    };
    let all = [1, 2, users.length];
    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <ToolbarTable numSelected={selectedUsers.length} />
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={
                                                selectedUsers.length ===
                                                users.length
                                            }
                                            color="primary"
                                            indeterminate={
                                                selectedUsers.length > 0 &&
                                                selectedUsers.length <
                                                    users.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mã user</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Registration date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={user._id}
                                        selected={
                                            selectedUsers.indexOf(user._id) !==
                                            -1
                                        }
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={
                                                    selectedUsers.indexOf(
                                                        user._id
                                                    ) !== -1
                                                }
                                                color="primary"
                                                onChange={event =>
                                                    handleSelectOne(
                                                        event,
                                                        user._id
                                                    )
                                                }
                                                value="true"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                className={
                                                    classes.nameContainer
                                                }
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={user.avatar ? user.avatar : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`}
                                                >
                                                    {getInitials(`${user.firstName}${user.lastName}`)}
                                                </Avatar>
                                                <Typography variant="body1">
                                                    {`${user.firstName} ${user.lastName}`}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.maGV}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.sdt}</TableCell>
                                        <TableCell>
                                            {moment(user.createdAt).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <div className={classes.mobile}>
                    <TablePagination
                        component="div"
                        count={users.length}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={all}
                        backIconButtonProps={{
                            'aria-label': 'previous page'
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page'
                        }}
                        labelRowsPerPage=""
                    />
                </div>
            </CardActions>
        </Card>
    );
};

UsersTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired
};

export default withStyles(styles)(UsersTable);
