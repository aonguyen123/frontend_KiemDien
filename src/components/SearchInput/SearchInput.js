import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';

const SearchInput = props => {
    const { className, classes, onChange, style, placeholder } = props;

    return (
        <Paper
            className={clsx(classes.root, className)}
            style={style}
        >
            <SearchIcon className={classes.icon} />
            <Input
                className={classes.input}
                disableUnderline
                onChange={onChange}
                placeholder={placeholder}
            />
        </Paper>
    );
};

SearchInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object
};

export default withStyles(styles)(SearchInput);
