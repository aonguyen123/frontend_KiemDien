import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, TablePagination, Link, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ClassCard, ClassesToolbar } from './components';
import { getClasses } from './../../actions/classes';
import { addClass } from './../../actions/actionClass';
import { searchTask, clearnTask } from './../../actions/actionTask';
import { clearErrors } from './../../actions/clearErrors';
import { closeNotify } from './../../actions/notify';
import styles from './styles';
import { LoadingCenter, Notifies } from 'components';

const ClassList = props => {
    const {
        classes,
        getClasses,
        match,
        actionClass,
        addClass,
        errors,
        clearErrors,
        isLoading,
        showNotify,
        closeNotify,
        searchTask,
        search,
        clearnTask
    } = props;
    let { classList } = props;
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClasses();
        clearnTask();
    }, [getClasses, actionClass, clearnTask]);
    useEffect(() => {
        setPage(0);
    }, [search]);
    
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const setCloseNotify = () => {
        closeNotify();
    };
    classList = classList.filter(lop => lop.tenlop.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionClass.isSuccess ? 'success' : 'error'}
                message={actionClass.message}
                openNotify={actionClass.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <ClassesToolbar
                addClass={addClass}
                getClasses={getClasses}
                actionClass={actionClass}
                errors={errors}
                clearErrors={clearErrors}
                searchTask={searchTask}
            />
            <Typography variant="body2">
                {`${classList.length} Records found. Page ${page + 1} of ${
                    Math.ceil(classList.length / rowsPerPage)
                }`}
            </Typography>

            {classList.length === 0 ? (
                <div className={classes.classNotfound}>
                    <Typography variant="h5" align="center">Class not found</Typography>
                </div>
            ) : (
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        {classList
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(lop => (
                                <Grid item key={lop._id} lg={4} md={6} xs={12}>
                                    <Link
                                        component={RouterLink}
                                        to={
                                            match.path +
                                            `/classDetail/${lop._id}`
                                        }
                                        underline="none"
                                    >
                                        <ClassCard lop={lop} />
                                    </Link>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            )}
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={classList.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={search ? 0 : page}
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
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    classList: state.classes.classes,
    actionClass: state.actionClass,
    errors: state.errors,
    isLoading: state.isLoading.isLoading,
    showNotify: state.showNotify.isShow,
    search: state.task.search
});
export default connect(
    mapStateToProps,
    { getClasses, addClass, clearErrors, closeNotify, searchTask, clearnTask }
)(withStyles(styles)(ClassList));
