import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/styles';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    TablePagination,
    Menu,
    MenuItem
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styles from './styles';

const CardClassMember = props => {
    const { classes, className, classById } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [selectedMember, setSelectedMember] = useState([]);

    const { dssv } = classById;
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setPage(0);
        setRowsPerPage(+event.target.value);
    };
    const handleSelectAll = event => {
        let selectedMember;
        if (event.target.checked) {
            selectedMember = dssv.map(sv => sv._id);
        } else {
            selectedMember = [];
        }
        setSelectedMember(selectedMember);
    };
    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedMember.indexOf(id);
        let newSelectedMember = [];

        if (selectedIndex === -1) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember,
                id
            );
        } else if (selectedIndex === 0) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(1)
            );
        } else if (selectedIndex === selectedMember.length - 1) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(0, selectedIndex),
                selectedMember.slice(selectedIndex + 1)
            );
        }
        setSelectedMember(newSelectedMember);
    };
    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                title="Class members"
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <GetAppIcon className={classes.iconCardMember} />
                    <Typography variant="button">Import</Typography>
                </MenuItem>
                <MenuItem>
                    <PersonAddIcon className={classes.iconCardMember} />
                    <Typography variant="button">Add member</Typography>
                </MenuItem>
            </Menu>
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    {(classById.dssv && classById.dssv.length) === 0 ? (
                        <Typography variant="body1" align="center">
                            Member not found
                        </Typography>
                    ) : (
                        <Table styles={{ border: '1px solid red' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={
                                                dssv
                                                    ? selectedMember.length ===
                                                      dssv.length
                                                    : null
                                            }
                                            color="primary"
                                            indeterminate={
                                                selectedMember.length > 0 &&
                                                selectedMember.length <
                                                    dssv.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>MSSV</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>BirthDay</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dssv ? 
                                    dssv
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map(sv => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={1}
                                            selected={
                                                selectedMember.indexOf(
                                                    sv._id
                                                ) !== -1
                                            }
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={
                                                        selectedMember.indexOf(
                                                            sv._id
                                                        ) !== -1
                                                    }
                                                    color="primary"
                                                    onChange={handleSelectOne}
                                                    value="true"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={
                                                        classes.nameContainer
                                                    }
                                                >
                                                    <Avatar
                                                        className={
                                                            classes.avatar
                                                        }
                                                        src={`//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`}
                                                    ></Avatar>
                                                    <Typography variant="body1">
                                                        aonguyen
                                                    </Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell>31151410004</TableCell>
                                            <TableCell>Nam</TableCell>
                                            <TableCell>20/09/1092</TableCell>
                                        </TableRow>
                                    )): null}
                            </TableBody>
                        </Table>
                    )}
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={dssv ? dssv.length : 0}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    backIconButtonProps={{
                        'aria-label': 'previous page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page'
                    }}
                    labelRowsPerPage=""
                />
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(CardClassMember);
