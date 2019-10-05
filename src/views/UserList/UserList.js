import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import { getUsers, deleteUsers, createUser } from './../../actions/users';
import { LoadingCenter } from 'components';
import { Notifies } from 'components';
import styles from './styles';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            openNotify: false
        };
    }
    setCloseNotify = params => {
        this.setState({
            openNotify: params
        });
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
        if(preProps.addUser !== this.props.addUser)
        {
            this.setState({
                openNotify: true
            });
            this.props.getUsers();
        }
    }
    render() {
        const { classes, users, deleteUsers, statusUser, createUser, errors, addUser, statusAdd } = this.props;
        const { isLoading, openNotify } = this.state;
        if(isLoading && statusUser !== 'USERS_NOTFOUND' && statusUser !== 'USERS_EXITS')
        { 
            return <LoadingCenter />;
        }
        return (
                <div className={classes.root}>
                    <Notifies 
                        variant="success" 
                        message={statusAdd}  
                        openNotify={openNotify}
                        setCloseNotify={params => this.setCloseNotify(params)}
                    />
                    <UsersToolbar 
                        createUser={createUser}
                        errors={errors}
                        addUser={addUser}
                    />
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
    errors: state.errors,
    addUser: state.userAdd.userAdd,
    statusAdd: state.userAdd.status
});
export default connect(mapStateToProps, { getUsers, deleteUsers, createUser })(withStyles(styles)(UserList));