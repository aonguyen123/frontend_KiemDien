import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers } from './../../actions/users';
import { LoadingCenter } from 'components';
import styles from './styles';

const UserList = props => {
    const { classes, users, getUsers } = props;
    useEffect(() => {
        if(users.length === 0)
        {
            getUsers();
        }
    }, [getUsers, users]);
    console.log(users);
    if(users.length === 0)
    {
        return <LoadingCenter />;
    }
    return (
        <div className={classes.root}>
            <UsersToolbar />
            <div className={classes.content}>
                <UsersTable users={users} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    users: state.users.users
});
export default connect(mapStateToProps, { getUsers })(withStyles(styles)(UserList));
