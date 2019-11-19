import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    TotalClasses,
    TotalUsers,
    PresentMember,
    TotalMember,
    PresentStatistical,
    MemberByPresence,
    LatestClasses,
    LatestAssigned,
    TopDashBoard
} from './components';
import { closeNotify } from './../../actions/notify';
import {
    filterTask,
    getDateFilter,
    clearnTask,
    getIndexChooseWeek
} from './../../actions/actionTask';
import { getDataDashBoard } from './../../actions/dashboard';
import { deleteClass } from './../../actions/actionClass';
import { Notifies, LoadingCenter } from 'components';
import styles from './styles';

const Dashboard = props => {
    const {
        classes,
        account,
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
        DataByPresences_Statistical,
        dateFilter,
        indexFilter,
        getDateFilter,
        getIndexChooseWeek,
        chooseWeek,
        clearnTask
    } = props;

    useEffect(() => {
        clearnTask();
        getDataDashBoard();
    }, [clearnTask, getDataDashBoard, actionClass]);

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
                <Grid item lg={12} xs={12}>
                    <TopDashBoard account={account}/>
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalClasses totalClass={totalClass} />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalUsers totalUser={totalUser} />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <PresentMember 
                        DataByPresences={DataByPresences_Statistical}
                    />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalMember totalMember={totalMember} />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <PresentStatistical
                        DataByPresences_Statistical={
                            DataByPresences_Statistical
                        }
                        getIndexChooseWeek={getIndexChooseWeek}
                        chooseWeek={chooseWeek}
                    />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <MemberByPresence
                        filterTask={filterTask}
                        getDateFilter={getDateFilter}
                        DataByPresences_Statistical={
                            DataByPresences_Statistical
                        }
                        dateFilter={dateFilter}
                        indexFilter={indexFilter}
                    />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <LatestClasses
                        classLatest={classLatest}
                        deleteClass={deleteClass}
                    />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestAssigned assignesLatest={assignesLatest} />
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = state => ({
    account: state.account,
    showNotify: state.showNotify.isShow,
    classLatest: state.classes.classes,
    isLoading: state.isLoading.isLoading,
    actionClass: state.actionClass,
    assignesLatest: state.assignesClass,
    totalClass: state.totalClass,
    totalUser: state.totalUser,
    totalMember: state.totalMember,
    DataByPresences_Statistical: state.statisticalClassesPresences,
    dateFilter: state.task.dateFilter,
    indexFilter: state.task.index,
    chooseWeek: state.task
});
export default connect(
    mapStateToProps,
    {
        closeNotify,
        getDataDashBoard,
        deleteClass,
        filterTask,
        getDateFilter,
        clearnTask,
        getIndexChooseWeek
    }
)(withStyles(styles)(Dashboard));
