import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Button,
    MenuItem,
    Menu,
    Typography
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SearchInput } from 'components';
import styles from './styles';

const options = ['All class', 'Active class', 'Inactive class'];
const PresencesToolbar = props => {
    const { className, classes } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };
    const handleClose = event => {
        setAnchorEl(null);
    };

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Search class"
                />
            </div>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button
                    aria-haspopup="true"
                    onClick={handleClick}
                    variant="text"
                    className={classes.paperButton}
                >
                    <Typography variant="h6">{options[selectedIndex]}</Typography>
                    <ArrowDropDownIcon />
                </Button>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        options.map((option, index) => (
                            <MenuItem 
                                onClick={event => handleMenuItemClick(event, index)}
                                key={option}
                                selected={index === selectedIndex}
                            >
                                {option}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        </div>
    );
};

export default withStyles(styles)(PresencesToolbar);
