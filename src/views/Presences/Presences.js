import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid, TablePagination, Typography } from '@material-ui/core';
import { getClassPresences } from './../../actions/presences';
import { searchTask, clearnTask, filterTask } from './../../actions/actionTask';
import { LoadingCenter } from 'components';
import { PresencesToolbar, PresencesCard } from './components';
import styles from './styles';

const Presences = props => {
    const {
        classes,
        match,
        getClassPresences,
        isLoading,
        searchTask,
        search,
        clearnTask,
        filterTask,
        indexFilter
    } = props;
    let { presencesClass } = props;

    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClassPresences();
        clearnTask();
    }, [getClassPresences, clearnTask]);

    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    presencesClass = presencesClass.filter(lop => lop.tenlop.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    if(indexFilter === 2)
    {
        presencesClass = presencesClass.filter(lop => lop.checkDate);
    }
    else if(indexFilter === 1)
    {
        presencesClass = presencesClass.filter(lop => !lop.checkDate);
    }

    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <PresencesToolbar 
                searchTask={searchTask}
                filterTask={filterTask}
            />
            <Typography variant="body2">
                {`${presencesClass.length} Records found. Page ${page + 1} of ${
                    rowsPerPage > presencesClass.length
                        ? 1
                        : Math.round(presencesClass.length / rowsPerPage)
                }`}
            </Typography>
            {presencesClass.length === 0 ? (
                <div className={classes.classNotfound}>
                    <Typography variant="h5" align="center">
                        Class not found
                    </Typography>
                </div>
            ) : (
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        {presencesClass
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(lop => (
                                <Grid item lg={4} md={6} xs={12} key={lop._id}>
                                    <PresencesCard lop={lop} match={match} />
                                </Grid>
                            ))}
                    </Grid>
                </div>
            )}
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={presencesClass.length}
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
    presencesClass: state.presencesClass,
    isLoading: state.isLoading.isLoading,
    search: state.task.search,
    indexFilter: state.task.index
});
export default connect(
    mapStateToProps,
    { getClassPresences, searchTask, clearnTask, filterTask }
)(withStyles(styles)(Presences));
