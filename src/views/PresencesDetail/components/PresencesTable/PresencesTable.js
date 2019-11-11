import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Divider
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ToolbarTable from './component/ToolbarTable/ToolbarTable';
import styles from './styles';

const PresencesTable = props => {
    const {
        className,
        classes,
        presenceDetailClass,
        deletePresenceMember
    } = props;
    const [selectedMember, setSelectedMember] = useState([]);
    const [selectedMssv, setSelectedMssv] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const { checkDateList, classById } = presenceDetailClass;
    const idClass = classById._id;

    const handleSelectAll = event => {
        let selectedMember;
        let selectedMssv;
        if (event.target.checked) {
            selectedMember = classById.dssv.map(sv => sv._id);
            selectedMssv = classById.dssv.map(sv => sv.maSV);
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
            newSelectedMssv = newSelectedMssv.concat(selectedMssv.slice(1));
        } else if (
            selectedIndex === selectedMember.length - 1 &&
            selectedIndexMssv === selectedMssv.length - 1
        ) {
            newSelectedMember = newSelectedMember.concat(
                selectedMember.slice(0, -1)
            );
            newSelectedMssv = newSelectedMssv.concat(selectedMssv.slice(0, -1));
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
    };
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <ToolbarTable
                selectedMember={selectedMember}
                selectedMssv={selectedMssv}
                idClass={idClass}
                deletePresenceMember={deletePresenceMember}
            />
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        rowSpan={2}
                                        padding="checkbox"
                                        className={classes.borderTable}
                                    >
                                        <Checkbox
                                            checked={
                                                classById.dssv &&
                                                selectedMember.length ===
                                                    classById.dssv.length
                                            }
                                            color="primary"
                                            indeterminate={
                                                selectedMember.length > 0 &&
                                                selectedMember.length <
                                                    classById.dssv.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        align="center"
                                        className={classes.borderTable}
                                    >
                                        Member code
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        className={classes.borderTable}
                                    >
                                        {checkDateList ? (
                                            <div style={{ width: '150px' }}>
                                                Name
                                            </div>
                                        ) : (
                                            'Name'
                                        )}
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        align="center"
                                        className={classes.borderTable}
                                    >
                                        Birth date
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        align="center"
                                        className={classes.borderTable}
                                    >
                                        Gender
                                    </TableCell>
                                    {checkDateList && (
                                        <TableCell
                                            className={classes.borderTable}
                                            colSpan={
                                                checkDateList.dateList &&
                                                checkDateList.dateList.length
                                            }
                                            align="center"
                                        >
                                            Check date
                                        </TableCell>
                                    )}
                                </TableRow>
                                {checkDateList && (
                                    <TableRow>
                                        {checkDateList.dateList &&
                                            checkDateList.dateList.map(date => (
                                                <TableCell
                                                    key={date._id}
                                                    align="center"
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
                                                    {date.date}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                )}
                            </TableHead>
                            <TableBody>
                                {classById.dssv &&
                                    classById.dssv
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map(sv => (
                                            <TableRow
                                                key={sv._id}
                                                className={classes.tableRow}
                                                hover
                                                selected={
                                                    selectedMember.indexOf(
                                                        sv._id
                                                    ) !== -1
                                                }
                                            >
                                                <TableCell
                                                    padding="checkbox"
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
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
                                                <TableCell
                                                    align="center"
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
                                                    <Typography variant="body1">
                                                        {sv.maSV}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
                                                    {sv.tenSV}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
                                                    {sv.ngaysinh}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    className={
                                                        classes.borderTable
                                                    }
                                                >
                                                    {sv.gioitinh}
                                                </TableCell>
                                                {checkDateList &&
                                                    checkDateList.dateList.map(
                                                        date => {
                                                            if (
                                                                !sv.checkDate.some(
                                                                    x =>
                                                                        x.date ===
                                                                        date.date
                                                                )
                                                            ) {
                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            date._id
                                                                        }
                                                                        align="center"
                                                                        className={
                                                                            classes.borderTable
                                                                        }
                                                                    ></TableCell>
                                                                );
                                                            }
                                                            return sv.checkDate.map(
                                                                (kd, index) => {
                                                                    if (
                                                                        date.date ===
                                                                            kd.date &&
                                                                        kd.status
                                                                    ) {
                                                                        return (
                                                                            <TableCell
                                                                                key={
                                                                                    index
                                                                                }
                                                                                align="center"
                                                                                className={
                                                                                    classes.borderTable
                                                                                }
                                                                            >
                                                                                <CheckIcon />
                                                                            </TableCell>
                                                                        );
                                                                    } else if (
                                                                        date.date ===
                                                                            kd.date &&
                                                                        !kd.status
                                                                    ) {
                                                                        return (
                                                                            <TableCell
                                                                                key={
                                                                                    index
                                                                                }
                                                                                align="center"
                                                                                className={
                                                                                    classes.borderTable
                                                                                }
                                                                            >
                                                                                P
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }
                                                            );
                                                        }
                                                    )}
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={classById.dssv ? classById.dssv.length : 0}
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
export default withStyles(styles)(PresencesTable);
