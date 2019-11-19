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
import { options, fillData } from './chart';
import styles from './styles';

const optionsSelect = ['By month', 'By week', 'By year'];
const MemberByPresence = props => {
    const {
        className,
        classes,
        filterTask,
        DataByPresences_Statistical,
        getDateFilter,
        dateFilter,
        indexFilter,
        ...rest
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const { data, statusPresences } = fillData(
        DataByPresences_Statistical,
        dateFilter,
        indexFilter
    );

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
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
                index={selectedIndex}
                getDateFilter={getDateFilter}
            />
            <CardHeader
                action={
                    <Button
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="text"
                        className={classes.paperButton}
                        size='small'
                    >
                        {optionsSelect[selectedIndex]}
                        <ArrowDropDownIcon />
                    </Button>
                }
                title="Members by presence"
            />
            <Divider />
            {data !== null ? (
                <CardContent>
                    <div className={classes.chartContainer}>
                        <Pie data={data} options={options} />
                    </div>
                    <div className={classes.stats}>
                        {statusPresences.map(status => (
                            <div className={classes.device} key={status.title}>
                                <span className={classes.deviceIcon}>
                                    {status.icon}
                                </span>
                                <Typography variant="body1">
                                    {status.title}
                                </Typography>
                                <Typography
                                    style={{ color: status.color }}
                                    variant="h2"
                                >
                                    {status.value}%
                                </Typography>
                            </div>
                        ))}
                    </div>
                </CardContent>
            ) : (
                <Typography
                    variant="h6"
                    align="center"
                >
                    Data not found
                </Typography>
            )}
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
