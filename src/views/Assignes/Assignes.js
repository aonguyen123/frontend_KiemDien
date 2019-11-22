import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TablePagination, Typography } from '@material-ui/core';
import { getClassAssignes } from './../../actions/assignes';
import {
    searchTask,
    filterTask,
    clearnTask,
    searchTaskDraw,
    clearnTaskDraw
} from './../../actions/actionTask';
import { getUserConditionStatusTrue } from './../../actions/users';
import {
    changeManagerPerson,
    removeManagerPerson
} from './../../actions/actionClassDetail';
import { closeNotify } from './../../actions/notify';
import { AssignesToolbar, CardClassAssignes } from './components';
import { LoadingCenter, Notifies } from 'components';
import styles from './styles';

const Assignes = props => {
    const {
        classes,
        getClassAssignes,
        isLoading,
        changeManagerPerson,
        removeManagerPerson,
        getUserConditionStatusTrue,
        loadingLocal,
        actionClass,
        showNotify,
        closeNotify,
        searchTask,
        search,
        searchDraw,
        filterTask,
        indexFilter,
        clearnTask,
        searchTaskDraw,
        clearnTaskDraw
    } = props;
    let { assignesClass, users } = props;

    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClassAssignes();
        clearnTask();
    }, [getClassAssignes, actionClass, clearnTask]);
    useEffect(() => {
        getUserConditionStatusTrue();
    }, [getUserConditionStatusTrue]);
    useEffect(() => {
        setPage(0);
    }, [search, indexFilter]);

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

    if (indexFilter === 1) {
        assignesClass = assignesClass.filter(lop => lop.managed === false);
    } else if (indexFilter === 2) {
        assignesClass = assignesClass.filter(lop => lop.managed === true);
    }
    assignesClass = assignesClass.filter(
        lop => lop.tenlop.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    users = users.filter(
        user => user.name.toLowerCase().indexOf(searchDraw.toLowerCase()) !== -1
    );

    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionClass.isSuccess ? 'success' : 'error'}
                message={actionClass.message}
                openNotify={actionClass.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <AssignesToolbar 
                searchTask={searchTask} 
                filterTask={filterTask} 
            />
            <Typography variant="body2">
                {`${assignesClass.length} Records found. Page ${page + 1} of ${
                    Math.ceil(assignesClass.length / rowsPerPage)
                }`}
            </Typography>

            <div className={classes.content}>
                {
                    assignesClass.length === 0 
                    &&
                    <Typography variant='h5' align='center'>Class not found</Typography>
                }
                <Grid container spacing={3}>
                    {assignesClass
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map(lop => (
                            <Grid item lg={4} md={6} xs={12} key={lop._id}>
                                <CardClassAssignes
                                    lop={lop}
                                    changeManagerPerson={changeManagerPerson}
                                    loadingLocal={loadingLocal}
                                    users={users}
                                    removeManagerPerson={removeManagerPerson}
                                    searchTaskDraw={searchTaskDraw}
                                    clearnTaskDraw={clearnTaskDraw}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={assignesClass.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={(search || indexFilter) ? 0 : page}
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
    assignesClass: state.assignesClass,
    actionClass: state.actionClass,
    isLoading: state.isLoading.isLoading,
    loadingLocal: state.loadingLocal.loadingLocal,
    users: state.users.users,
    showNotify: state.showNotify.isShow,
    search: state.task.search,
    searchDraw: state.taskDraw.search,
    indexFilter: state.task.index
});
export default connect(
    mapStateToProps,
    {
        getClassAssignes,
        changeManagerPerson,
        removeManagerPerson,
        getUserConditionStatusTrue,
        closeNotify,
        searchTask,
        filterTask,
        clearnTask,
        searchTaskDraw,
        clearnTaskDraw
    }
)(withStyles(styles)(Assignes));
