import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import DialogAddUser from './../DialogAddUser/DialogAddUser';
import styles from './styles';

const UsersToolbar = props => {
    const { className, classes, createUser, errors, clearErrors, searchTask } = props;  
    const [open, setOpen] = React.useState(false);
    let [keyword] = useState('');

    const handleOpenDialog = () => {
        setOpen(true);
    }
    const handleCloseDialog = params => {
        setOpen(params);
    }
    const handleChange = event => {
        keyword = event.target.value;
        searchTask(keyword);
    }
    return (
        <div className={clsx(classes.root, className)}>
            <DialogAddUser 
                open={open} 
                handleCloseDialog={handleCloseDialog} 
                createUser={createUser}
                errors={errors}
                clearErrors={clearErrors}
            />
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained" onClick={handleOpenDialog}>
                    Add user
                </Button>
            </div>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Search email user"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(UsersToolbar);
