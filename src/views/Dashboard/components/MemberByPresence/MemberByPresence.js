import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { DialogStatistical } from './components';
import { devices, options, fillData } from './chart';
import styles from './styles';

const optionsSelect = ['By week', 'By month', 'By year'];
const MemberByPresence = props => {
    const {
        className,
        classes,
        filterTask,
        filterStatistical,
        presencesData,
        ...rest
    } = props;
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
        setSelectedIndex(index);
        filterTask(index);
        setOpen(true);
        setAnchorEl(null);
    };
    const handleCloseDialog = params => {
        setOpen(params);
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <DialogStatistical
                open={open}
                handleCloseDialog={handleCloseDialog}
                filterStatistical={filterStatistical}
            />
            <CardHeader
                action={
                    <Button
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="text"
                        className={classes.paperButton}
                    >
                        <Typography variant="h5">
                            {optionsSelect[selectedIndex]}
                        </Typography>
                        <ArrowDropDownIcon />
                    </Button>
                }
                title="Members by presence"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Pie data={fillData(presencesData, filterStatistical)} options={options} />
                </div>
                <div className={classes.stats}>
                    {devices.map(device => (
                        <div className={classes.device} key={device.title}>
                            <span className={classes.deviceIcon}>
                                {device.icon}
                            </span>
                            <Typography variant="body1">
                                {device.title}
                            </Typography>
                            <Typography
                                style={{ color: device.color }}
                                variant="h2"
                            >
                                {device.value}%
                            </Typography>
                        </div>
                    ))}
                </div>
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
export default withStyles(styles)(MemberByPresence);
