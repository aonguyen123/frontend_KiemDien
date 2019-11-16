import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    TotalClasses,
    TotalUsers,
    TasksProgress,
    TotalMember,
    LatestSales,
    MemberByPresence,
    LatestClasses,
    LatestAssigned
} from './components';
import { closeNotify } from './../../actions/notify';
import { filterTask } from './../../actions/actionTask';
import { getDataDashBoard } from './../../actions/dashboard';
import { deleteClass } from './../../actions/actionClass';
import { Notifies, LoadingCenter } from 'components';
import styles from './styles';

const Dashboard = props => {
    const {
        classes,
        showNotify,
        closeNotify,
        classLatest,
        getDataDashBoard,
        isLoading,
        deleteClass,
        actionClass,
        assignesLatest,
        totalClass,
        totalUser,
        totalMember,
        filterTask,
        filterStatistical,
        presencesData
    } = props;

    useEffect(() => {
        getDataDashBoard();
    }, [getDataDashBoard, actionClass]);

    const setCloseNotify = () => {
        closeNotify();
    };

    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionClass.isSuccess ? 'success' : 'error'}
                message={actionClass.message}
                openNotify={showNotify}
                setCloseNotify={setCloseNotify}
            />
            <Grid container spacing={4}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalClasses 
                        totalClass={totalClass}
                    />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalUsers 
                        totalUser={totalUser}
                    />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TasksProgress />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalMember 
                        totalMember={totalMember}
                    />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestSales />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <MemberByPresence 
                        filterTask={filterTask}
                        filterStatistical={filterStatistical}
                        presencesData={presencesData}
                    />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <LatestClasses 
                        classLatest={classLatest} 
                        deleteClass={deleteClass}
                    />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestAssigned 
                        assignesLatest={assignesLatest}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = state => ({
    showNotify: state.showNotify.isShow,
    classLatest: state.classes.classes,
    isLoading: state.isLoading.isLoading,
    actionClass: state.actionClass,
    assignesLatest: state.assignesClass,
    totalClass: state.totalClass,
    totalUser: state.totalUser,
    totalMember: state.totalMember,
    filterStatistical: state.task.index,
    presencesData: state.presencesClass
});
export default connect(
    mapStateToProps,
    { closeNotify, getDataDashBoard, deleteClass, filterTask }
)(withStyles(styles)(Dashboard));
