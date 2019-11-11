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
import { LoadingButton } from 'components';
import AddMemberDialog from './../AddMemberDialog/AddMemberDialog';
import { TableToolBar } from './components';
import styles from './styles';

const getMember = (dssv, idMember) => {
    const member = {};
    dssv.forEach(sv => {
        if(sv._id === idMember)
        {
            member.id = sv._id;
            member.mssv = sv.maSV;
            member.ten = sv.tenSV;
            member.ngaysinh = sv.ngaysinh;
            member.gioitinh = sv.gioitinh;
            return false;
        }
    });
    return member;
};

const CardClassMember = props => {
    const {
        classes,
        className,
        classById,
        importDssvClassById,
        addClassMemberById,
        errors,
        editClassMemberById,
        clearErrors,
        deleteClassMemberById
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [selectedMember, setSelectedMember] = useState([]);
    const [selectedMssv, setSelectedMssv] = useState([]);
    const [loadingButton, setLoadingButton] = useState(false);
    const [open, setOpen] = useState(false);
    let [fileDssv] = useState('');
    let [member, setMember] = useState({});

    const { dssv, _id } = classById;
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
        let selectedMssv;
        if (event.target.checked) {
            selectedMember = dssv.map(sv => sv._id);
            selectedMssv = dssv.map(sv => sv.maSV);
        } else {
            selectedMember = [];
            selectedMssv = [];
        }
        setSelectedMember(selectedMember);
        setSelectedMssv(selectedMssv);
    };
    const handleSelectOne = (event, id, maSV) => {
        const selectedIndex = selectedMember.indexOf(id);
        const selectedIndexMssv = selectedMssv.indexOf(maSV);
        let newSelectedMember = [];
        let newSelectedMssv = [];
        if (selectedIndex === -1) {
            newSelectedMember = newSelectedMember.concat(selectedMember, id);
            newSelectedMssv = newSelectedMssv.concat(selectedMssv, maSV);
        } else if (selectedIndex === 0 && selectedIndexMssv === 0) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(1)
            );
            newSelectedMssv = newSelectedMssv.concat(
                selectedMssv.slice(1)
            );
        } else if (selectedIndex === selectedMember.length - 1 && selectedIndexMssv === selectedMssv.length -1) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(0, -1)
            );
            newSelectedMssv = newSelectedMssv.concat(
                selectedMssv.slice(0, -1)
            );
        } else if (selectedIndex > 0 && selectedIndexMssv > 0) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(0, selectedIndex),
                selectedMember.slice(selectedIndex + 1)
            );
            newSelectedMssv = newSelectedMssv.concat(
                selectedMssv.slice(0, selectedIndexMssv),
                selectedMssv.slice(selectedIndexMssv + 1)
            );
        }
        setSelectedMember(newSelectedMember);
        setSelectedMssv(newSelectedMssv);

        setMember(getMember(dssv, newSelectedMember[0]));
    };
    const handleChange = e => {
        setLoadingButton(true);
        fileDssv = e.target.files[0];
        if (fileDssv) {
            importDssvClassById(fileDssv, classById._id);
        }
    };
    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = params => {
        setOpen(params);
    };
    return (
        <Card className={clsx(classes.root, className)}>
            <AddMemberDialog
                open={open}
                handleCloseDialog={handleCloseDialog}
                classById={classById}
                addClassMemberById={addClassMemberById}
                errors={errors}
                clearErrors={clearErrors}
            />
            {(selectedMember.length > 0) 
                ? <TableToolBar 
                    selectedMember={selectedMember} 
                    selectedMssv={selectedMssv}
                    member={member}
                    idClass={_id}
                    errors={errors}
                    editClassMemberById={editClassMemberById}
                    clearErrors={clearErrors}
                    deleteClassMemberById={deleteClassMemberById}
                /> 
                :
                <CardHeader
                    title="Class members"
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
            }
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <input
                    accept=".xlsx, .xls, .csv, .xml"
                    className={classes.input}
                    id="text-button-file-dssv"
                    multiple
                    type="file"
                    onChange={handleChange}
                    value=""
                    disabled={loadingButton}
                />
                <label htmlFor="text-button-file-dssv">
                    <MenuItem>
                        <GetAppIcon className={classes.iconCardMember} />
                        <Typography variant="button">
                            {loadingButton ? <LoadingButton /> : null}
                            Import
                        </Typography>
                    </MenuItem>
                </label>
                <MenuItem onClick={handleOpenDialog}>
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
                        <React.Fragment>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                onChange={handleSelectAll}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div style={{width: '150px'}}>Name</div>
                                        </TableCell>
                                        <TableCell align='center'>MSSV</TableCell>
                                        <TableCell align='center'>Gender</TableCell>
                                        <TableCell align='center'>BirthDay</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dssv
                                        ? dssv
                                              .slice(
                                                  page * rowsPerPage,
                                                  page * rowsPerPage +
                                                      rowsPerPage
                                              )
                                              .map(sv => (
                                                  <TableRow
                                                      className={
                                                          classes.tableRow
                                                      }
                                                      hover
                                                      key={sv._id}
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
                                                              onChange={event =>
                                                                  handleSelectOne(
                                                                      event,
                                                                      sv._id,
                                                                      sv.maSV
                                                                  )
                                                              }
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
                                                                  {sv.tenSV}
                                                              </Typography>
                                                          </div>
                                                      </TableCell>
                                                      <TableCell align='center'>
                                                          {sv.maSV}
                                                      </TableCell>
                                                      <TableCell align='center'>
                                                          {sv.gioitinh}
                                                      </TableCell>
                                                      <TableCell align='center'>
                                                          {sv.ngaysinh}
                                                      </TableCell>
                                                  </TableRow>
                                              ))
                                        : null}
                                </TableBody>
                            </Table>
                        </React.Fragment>
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
