import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers, deleteUsers } from './../../actions/users';
import { LoadingCenter } from 'components';
import styles from './styles';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        this.props.getUsers();
    }
    componentDidUpdate(preProps) {
        if(preProps.users.length !== this.props.users.length )
        {
            this.setState({
                isLoading: false,
            })
        }
    }
    render() {
        const { classes, users, deleteUsers, statusUser } = this.props;
        const { isLoading } = this.state;
        if(isLoading && statusUser !== 'USERS_NOTFOUND' && statusUser !== 'USERS_EXITS')
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
    }
};
const mapStateToProps = state => ({
    users: state.users.users,
    statusUser: state.users.status,
});
export default connect(mapStateToProps, { getUsers, deleteUsers })(withStyles(styles)(UserList));