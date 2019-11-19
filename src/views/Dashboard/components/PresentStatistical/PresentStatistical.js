import React, { useState } from 'react';
import clsx from 'clsx';
import { Line } from 'react-chartjs-2';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { fillData, options } from './chart';
import { DialogChoose } from './components';
import styles from './styles';

const optionsSelect = ['Last week', 'Choose week'];
const PresentStatistical = props => {
    const {
        className,
        classes,
        DataByPresences_Statistical,
        getIndexChooseWeek,
        chooseWeek,
        ...rest
    } = props;
    const { data } = fillData(DataByPresences_Statistical, chooseWeek);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (event, index) => {
        if(index === 0)
        {
            getIndexChooseWeek(index);
        }
        setSelectedIndex(index);
        setOpen(true);
        setAnchorEl(null);
    };
    const handleCloseDialog = params => {
        setOpen(params);
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <DialogChoose
                open={selectedIndex === 1 && open ? true : false}
                handleCloseDialog={handleCloseDialog}
                getIndexChooseWeek={getIndexChooseWeek}
                index={selectedIndex}
            />
            <CardHeader
                action={
                    <Button size="small" variant="text" onClick={handleClick}>
                        {optionsSelect[selectedIndex]}
                        <ArrowDropDownIcon />
                    </Button>
                }
                title="Member by present"
            />
            <Divider />
            <CardContent>
                {data === null ? (
                    <Typography variant="h6" align="center">
                        Data not found
                    </Typography>
                ) : (
                    <div className={classes.chartContainer}>
                        <Line data={data} options={options} />
                    </div>
                )}
            </CardContent>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {optionsSelect.map((option, index) => (
                    <MenuItem
                        onClick={event => handleMenuItemClick(event, index)}
                        key={option}
                        selected={index === selectedIndex}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </Card>
    );
};

export default withStyles(styles)(PresentStatistical);
