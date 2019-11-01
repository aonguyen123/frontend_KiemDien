import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TablePagination } from '@material-ui/core';
import { getClassAssignes } from './../../actions/assignes';
import { getUserConditionStatusTrue } from './../../actions/users';
import { changeManagerPerson, removeManagerPerson } from './../../actions/actionClassDetail';
import { closeNotify } from './../../actions/notify';
import { AssignesToolbar, CardClassAssignes } from './components';
import { LoadingCenter, Notifies } from 'components';
import styles from './styles';

const Assignes = props => {
    const {
        classes,
        getClassAssignes,
        assignesClass,
        isLoading,
        changeManagerPerson,
        removeManagerPerson,
        getUserConditionStatusTrue,
        loadingLocal,
        users,
        actionClass,
        showNotify,
        closeNotify
    } = props;
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClassAssignes();
    }, [getClassAssignes, actionClass]);
    useEffect(() => {
        getUserConditionStatusTrue();
    }, [getUserConditionStatusTrue]);

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
            <AssignesToolbar />
            <div className={classes.content}>
                <Grid container spacing={3}>
                    {assignesClass.length === 0
                        ? 'Assignes not found'
                        : assignesClass
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map(lop => (
                                  <Grid
                                      item
                                      lg={4}
                                      md={6}
                                      xs={12}
                                      key={lop._id}
                                  >
                                        <CardClassAssignes 
                                            lop={lop} 
                                            changeManagerPerson={changeManagerPerson}
                                            loadingLocal={loadingLocal}
                                            users={users}
                                            removeManagerPerson={removeManagerPerson}
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
    assignesClass: state.assignesClass,
    actionClass: state.actionClass,
    isLoading: state.isLoading.isLoading,
    loadingLocal: state.loadingLocal.loadingLocal,
    users: state.users.users,
    showNotify: state.showNotify.isShow,
});
export default connect(
    mapStateToProps,
    { getClassAssignes, changeManagerPerson, removeManagerPerson, getUserConditionStatusTrue, closeNotify }
)(withStyles(styles)(Assignes));
