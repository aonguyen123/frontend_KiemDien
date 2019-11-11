import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers } from './../../actions/users';
import { createUser, deleteUsers } from './../../actions/actionUser';
import { searchTask, clearnTask } from './../../actions/actionTask';
import { clearErrors } from './../../actions/clearErrors';
import { closeNotify } from './../../actions/notify';
import { LoadingCenter } from 'components';
import { Notifies } from 'components';
import styles from './styles';

const UserList = props => {
    const {
        classes,
        errors,
        actionUser,
        isLoading,
        getUsers,
        createUser,
        deleteUsers,
        showNotify,
        closeNotify,
        clearErrors,
        searchTask,
        search,
        clearnTask
    } = props;
    let { users } = props;

    useEffect(() => {
        getUsers();
        clearnTask();
    }, [getUsers, actionUser, clearnTask]);

    const setCloseNotify = () => {
        closeNotify();
    };
    users = users.filter(user => user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    if(isLoading) return <LoadingCenter />
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionUser.isSuccess ? 'success' : 'error'}
                message={actionUser.message}
                openNotify={actionUser.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <UsersToolbar
                createUser={createUser}
                errors={errors}
                clearErrors={clearErrors}
                searchTask={searchTask}
            />
            <div className={classes.content}>
                <UsersTable 
                    users={users} 
                    deleteUsers={deleteUsers}
                />
            </div>
        </div>
    );    
};
const mapStateToProps = state => ({
    users: state.users.users,
    actionUser: state.actionUser,
    isLoading: state.isLoading.isLoading,
    showNotify: state.showNotify.isShow,
    errors: state.errors,
    search: state.task.search
});
export default connect(
    mapStateToProps,
    { getUsers, deleteUsers, createUser, clearErrors, closeNotify, searchTask, clearnTask }
)(withStyles(styles)(UserList));