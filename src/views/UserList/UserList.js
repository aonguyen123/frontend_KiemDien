import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers } from './../../actions/users';
import { createUser, deleteUsers } from './../../actions/actionUser';
import { clearErrors } from './../../actions/clearErrors';
import { closeNotify } from './../../actions/notify';
import { LoadingCenter } from 'components';
import { Notifies } from 'components';
import styles from './styles';

const UserList = props => {
    const {
        classes,
        errors,
        users,
        actionUser,
        isLoading,
        statusUsers,
        getUsers,
        createUser,
        deleteUsers,
        showNotify,
        closeNotify,
        clearErrors
    } = props;
    
    useEffect(() => {
        getUsers();
    }, [getUsers, actionUser]);

    const setCloseNotify = () => {
        closeNotify();
    };
    // const search = keyword => {
    //     const keywordLowerCase = keyword.toLowerCase();
    //     let {users} = this.props;
    //     users = users.filter(el =>
    //         el.email.toLowerCase().includes(keywordLowerCase)
    //     );
    //     this.setState({
    //         users
    //     })
    // };
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
            />
            <div className={classes.content}>
                <UsersTable 
                    users={users} 
                    deleteUsers={deleteUsers}
                    statusUsers={statusUsers}
                />
            </div>
        </div>
    );    
};
const mapStateToProps = state => ({
    users: state.users.users,
    statusUsers: state.users.status,
    actionUser: state.actionUser,
    isLoading: state.isLoading.isLoading,
    showNotify: state.showNotify.isShow,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getUsers, deleteUsers, createUser, clearErrors, closeNotify }
)(withStyles(styles)(UserList));