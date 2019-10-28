import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, TablePagination, Link, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ClassCard, ClassesToolbar } from './components';
import { getClasses } from './../../actions/classes';
import { addClass } from './../../actions/actionClass';
import { clearErrors } from './../../actions/clearErrors';
import { closeNotify } from './../../actions/notify';
import styles from './styles';
import { LoadingCenter, Notifies } from 'components';

const ClassList = props => {
    const {
        classes,
        getClasses,
        classList,
        match,
        actionClass,
        addClass,
        errors,
        clearErrors,
        isLoading,
        showNotify,
        closeNotify,
        statusClassList
    } = props;
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClasses();
    }, [getClasses, actionClass]);
    
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
            />
            {statusClassList === 'CLASS_NOTFOUND' ? (
                <div className={classes.classNotfound}>
                    <Typography variant="h3" align="center">Class not found</Typography>
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
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    classList: state.classes.classes,
    statusClassList: state.classes.status,
    actionClass: state.actionClass,
    errors: state.errors,
    isLoading: state.isLoading.isLoading,
    showNotify: state.showNotify.isShow
});
export default connect(
    mapStateToProps,
    { getClasses, addClass, clearErrors, closeNotify }
)(withStyles(styles)(ClassList));
