import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid, TablePagination, Typography } from '@material-ui/core';
import { getClassPresences } from './../../actions/presences';
import { LoadingCenter } from 'components';
import { PresencesToolbar, PresencesCard } from './components';
import styles from './styles';

const Presences = props => {
    const { classes, match, presencesClass, getClassPresences, isLoading } = props;
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getClassPresences();
    }, [getClassPresences]);

    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <PresencesToolbar />
            <Typography variant="body2">
                {
                    `${presencesClass.length} Records found. Page ${page +
                    1} of ${rowsPerPage > presencesClass.length ? 1 : Math.round(presencesClass.length / rowsPerPage)}`
                }
            </Typography>
            {presencesClass.length === 0 ? (
                <div className={classes.classNotfound}>
                    <Typography variant="h3" align="center">
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
                                    <PresencesCard 
                                        lop={lop} 
                                        match={match}
                                    />
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
    isLoading: state.isLoading.isLoading
});
export default connect(
    mapStateToProps,
    { getClassPresences }
)(withStyles(styles)(Presences));
