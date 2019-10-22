import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import { LoadingCenter, StatusBullet } from 'components';
import { URI } from './../../../../constants/types';
import styles from './styles';

const statusColors = {
    1: 'success',
    2: 'info',
    0: 'danger'
};
class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            rowsPerPage: 5,
            page: 0,
            loadingTable: false
        };
    }
    handleSelectAll = event => {
        const { users } = this.props;
        let selectedUsers;
        if (event.target.checked) {
            selectedUsers = users.map(user => user._id);
        } else {
            selectedUsers = [];
        }
        this.setState({
            selectedUsers: selectedUsers
        });
    };
    handleSelectOne = (event, id) => {
        const selectedIndex = this.state.selectedUsers.indexOf(id);
        let newSelectedUsers = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(
                this.state.selectedUsers,
                id
            );
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(
                this.state.selectedUsers.slice(1)
            );
        } else if (selectedIndex === this.state.selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(
                this.state.selectedUsers.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                this.state.selectedUsers.slice(0, selectedIndex),
                this.state.selectedUsers.slice(selectedIndex + 1)
            );
        }
        this.setState({
            selectedUsers: newSelectedUsers
        });
    };
    loadingTable = () => {
        this.setState({
            loadingTable: true
        });
    };
    handlePageChange = (event, page) => {
        this.setState({
            page: page
        });
    };
    componentDidUpdate(preProps) {
        if (preProps.users.length !== this.props.users.length) {
            this.setState({
                selectedUsers: [],
                loadingTable: false
            });
        }
    }
    handleRowsPerPageChange = event => {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0
        });
    };
    render() {
        const { className, users, classes, deleteUsers } = this.props;
        const { selectedUsers, page, rowsPerPage, loadingTable } = this.state;
        if (loadingTable) {
            return <LoadingCenter />;
        }
        return (
            <Card className={clsx(classes.root, className)}>
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <ToolbarTable
                            numSelected={selectedUsers.length}
                            deleteUsers={deleteUsers}
                            selectedUsers={selectedUsers}
                            loadingTable={() => this.loadingTable()}
                        />
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
                                                onChange={this.handleSelectAll}
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
                                                            this.handleSelectOne(
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
                                                        className={classes.statusContainer}
                                                    >
                                                        <StatusBullet 
                                                            className={classes.status}
                                                            color={statusColors[user.status]}  
                                                            size="sm"
                                                        />
                                                        {user.status === 1 ? 'Completed' : user.status === 2 ? 'Missing' : 'Incomplete'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.ngaydangki}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                {users.length === 0 ? (
                    <Typography
                        variant="subtitle2"
                        style={{ textAlign: 'center' }}
                    >
                        User not found
                    </Typography>
                ) : (
                    <CardActions className={classes.actions}>
                        <TablePagination
                            component="div"
                            count={users.length}
                            onChangePage={this.handlePageChange}
                            onChangeRowsPerPage={this.handleRowsPerPageChange}
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
                )}
            </Card>
        );
    }
}

UsersTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired
};

export default withStyles(styles)(UsersTable);
