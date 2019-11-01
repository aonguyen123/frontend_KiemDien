import React, { useState } from 'react';
import clsx from 'clsx';
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
import { StatusBullet } from 'components';
import { URI } from './../../../../constants/types';
import styles from './styles';

const statusColors = {
    1: 'success',
    2: 'info',
    0: 'danger'
};

const UsersTable = props => {
    const { className, users, classes, deleteUsers } = props;
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleSelectAll = event => {
        let selectedUsers;
        if (event.target.checked) {
            selectedUsers = users.map(user => user._id);
        } else {
            selectedUsers = [];
        }
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
        setSelectedUsers(newSelectedUsers);
    };
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <ToolbarTable
                selectedUsers={selectedUsers}
                deleteUsers={deleteUsers}
            />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        {users.length === 0 ? (
                            <Typography
                                variant="h5"
                                style={{ textAlign: 'center' }}
                            >
                                User not found
                            </Typography>
                        ) : (
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
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Registration date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map(user => (
                                            <TableRow
                                                className={classes.tableRow}
                                                hover
                                                key={user._id}
                                                selected={
                                                    selectedUsers.indexOf(
                                                        user._id
                                                    ) !== -1
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
                                                            className={
                                                                classes.avatar
                                                            }
                                                            src={
                                                                user.avatar
                                                                    ? `${URI}/getAvatar/${user.avatar}`
                                                                    : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                                                            }
                                                        >
                                                            {getInitials(
                                                                user.name
                                                            )}
                                                        </Avatar>
                                                        <Typography variant="body1">
                                                            {user.name}
                                                        </Typography>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.sdt}
                                                </TableCell>
                                                <TableCell>
                                                    {user.gioitinh
                                                        ? `Nam`
                                                        : `Nữ`}
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
                                                                    user.status
                                                                ]
                                                            }
                                                            size="sm"
                                                        />
                                                        {user.status === 1
                                                            ? 'Completed'
                                                            : user.status === 2
                                                            ? 'Missing'
                                                            : 'Incomplete'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.ngaydangki}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={users.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    backIconButtonProps={{
                        'aria-label': 'previous page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page'
                    }}
                    labelRowsPerPage=""
                />
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(UsersTable);
