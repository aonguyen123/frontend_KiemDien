import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import {
    getUsers,
    deleteUsers,
    createUser,
    clearErrors
} from './../../actions/users';
import { LoadingCenter } from 'components';
import { Notifies } from 'components';
import styles from './styles';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            openNotify: false,
            openNotifyDelete: false,
            users: []
        };
    }
    setCloseNotify = params => {
        this.setState({
            openNotify: params,
            openNotifyDelete: params
        });
    }
    componentDidMount() {
        this.props.getUsers();
    }
    componentDidUpdate(preProps, preState) {
        if(preState.users.length !== this.props.users.length)
        {
            this.setState({
                isLoading: false,
                users: this.props.users
            })
        }
        if(this.props.statusUser === 'DELETE_SUCCESS')
        {
            this.props.getUsers();  
        }
        if (preProps.addUser !== this.props.addUser) {
            this.setState({
                openNotify: true
            });
            this.props.getUsers();
        }
    }
    search = keyword => {
        const keywordLowerCase = keyword.toLowerCase();
        let {users} = this.props;
        users = users.filter(el =>
            el.email.toLowerCase().includes(keywordLowerCase)
        );
        this.setState({
            users
        })
    }
    render() {
        const {
            classes,
            deleteUsers,
            createUser,
            errors,
            addUser,
            statusAdd,
            clearErrors
        } = this.props;
        const { isLoading, openNotify, openNotifyDelete, users } = this.state;
        if (isLoading) {
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
                <Notifies
                    variant="success"
                    message="Delete user success"
                    openNotify={openNotifyDelete}
                    setCloseNotify={params => this.setCloseNotify(params)}
                />
                <UsersToolbar
                    createUser={createUser}
                    errors={errors}
                    addUser={addUser}
                    clearErrors={clearErrors}
                    searchUser={keyword => this.search(keyword)}
                />
                <div className={classes.content}>
                    <UsersTable users={users} deleteUsers={deleteUsers} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    users: state.users.users,
    statusUser: state.users.status,
    errors: state.errors,
    addUser: state.userAdd.userAdd,
    statusAdd: state.userAdd.status
});
export default connect(
    mapStateToProps,
    { getUsers, deleteUsers, createUser, clearErrors }
)(withStyles(styles)(UserList));
