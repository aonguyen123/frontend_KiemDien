import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers, deleteUsers } from './../../actions/users';
import { LoadingCenter, Notifies } from 'components';
import styles from './styles';

const UserList = props => {
    const { classes, users, getUsers, deleteUsers, statusUser } = props;
    const [showStatus, setShowStatus] = useState(false);
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    if(users.length === 0 && statusUser !== 'USERS_NOTFOUND')
    { 
        return <LoadingCenter />;
    }
    return (
        <div className={classes.root}>
            <UsersToolbar />
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
    statusUser: state.users.status
});
export default connect(mapStateToProps, { getUsers, deleteUsers })(withStyles(styles)(UserList));
