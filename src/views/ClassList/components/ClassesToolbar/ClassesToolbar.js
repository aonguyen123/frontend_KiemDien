import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import DialogAddClass from './../DialogAddClass/DialogAddClass';
import { SearchInput } from 'components';
import styles from './styles';

const ProductsToolbar = props => {
    const { className, classes, addClass, getClasses, actionClass, errors, clearErrors } = props;
    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => {
        setOpen(true);
    }
    const handleCloseDialog = params => {
        setOpen(params);
    }
    return (
        <div className={clsx(classes.root, className)}>
            <DialogAddClass 
                open={open} 
                handleCloseDialog={handleCloseDialog} 
                addClass={addClass}
                getClasses={getClasses}
                actionClass={actionClass}
                errors={errors}
                clearErrors={clearErrors}
            />
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained" onClick={handleOpenDialog}>
                    Add Class
                </Button>
            </div>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Search class"
                />
            </div>
        </div>
    );
};

ProductsToolbar.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(ProductsToolbar);
