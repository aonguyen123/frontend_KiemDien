import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import DialogAddUser from './../DialogAddUser/DialogAddUser';
import styles from './styles';

const UsersToolbar = props => {
    const { className, classes } = props;  
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    }
    const handleCloseDialog = params => {
        setOpen(params);
    }
    return (
        <div className={clsx(classes.root, className)}>
            <DialogAddUser open={open} handleCloseDialog={handleCloseDialog} />
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained" onClick={handleOpenDialog}>
                    Add user
                </Button>
            </div>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Search user"
                />
            </div>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(UsersToolbar);
