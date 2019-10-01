import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import styles from './styles';

const UsersToolbar = props => {
    const { className, classes } = props;  

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained">
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
