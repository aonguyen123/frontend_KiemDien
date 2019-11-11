import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    ToolbarClassDetal,
    CardClassDetail,
    CardManage,
    CardClassMember,
    CardClassAvatar
} from './components';
import { LoadingCenter, Notifies } from 'components';
import { clearErrors } from './../../actions/clearErrors';
import { getUserConditionStatusTrue } from './../../actions/users';
import { getClassById } from './../../actions/classes';
import { deleteClass } from './../../actions/actionClass';
import { searchTaskDraw, clearnTaskDraw } from './../../actions/actionTask';
import {
    updateInfoClassById,
    updateAvatarClassById,
    removeAvatarClass,
    importDssvClassById,
    addClassMemberById,
    editClassMemberById,
    deleteClassMemberById,
    changeManagerPerson,
    removeManagerPerson
} from './../../actions/actionClassDetail';
import { closeNotify } from './../../actions/notify';
import styles from './styles';

const ClassDetail = props => {
    const {
        match,
        classes,
        getClassById,
        classById,
        userOfClass,
        errors,
        history,
        isLoading,
        updateInfoClassById,
        showNotify,
        actionClass,
        closeNotify,
        updateAvatarClassById,
        removeAvatarClass,
        importDssvClassById,
        addClassMemberById,
        editClassMemberById,
        clearErrors,
        deleteClassMemberById,
        deleteClass,
        getUserConditionStatusTrue,
        loadingLocal,
        changeManagerPerson,
        removeManagerPerson,
        searchTaskDraw,
        clearnTaskDraw,
        searchDraw
    } = props;
    let { users } = props;

    const idClass = classById._id;

    useEffect(() => {
        getClassById(match.params.id, history);
    }, [getClassById, match.params.id, history, actionClass]);
    useEffect(() => {
        getUserConditionStatusTrue();
    }, [getUserConditionStatusTrue]);

    const setCloseNotify = () => {
        closeNotify();
    };

    users = users.filter(user => user.name.toLowerCase().indexOf(searchDraw.toLowerCase()) !== -1);

    if (isLoading) {
        return <LoadingCenter />;
    }
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionClass.isSuccess ? 'success' : 'error'}
                message={actionClass.message}                
                openNotify={actionClass.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <ToolbarClassDetal 
                classById={classById} 
                deleteClass={deleteClass}
            />
            <div className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item lg={8} md={6} xl={8} xs={12}>
                        <CardClassDetail
                            classById={classById}
                            updateInfoClassById={updateInfoClassById}
                            errors={errors}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <CardClassAvatar
                            classById={classById}
                            updateAvatarClassById={updateAvatarClassById}
                            errors={errors}
                            removeAvatarClass={removeAvatarClass}
                        />
                    </Grid>
                    <Grid item lg={8} md={6} xl={8} xs={12}>
                        <CardClassMember 
                            classById={classById} 
                            importDssvClassById={importDssvClassById}
                            addClassMemberById={addClassMemberById}
                            errors={errors}
                            editClassMemberById={editClassMemberById}
                            clearErrors={clearErrors}
                            deleteClassMemberById={deleteClassMemberById}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <CardManage 
                            userOfClass={userOfClass} 
                            loadingLocal={loadingLocal}
                            users={users}
                            changeManagerPerson={changeManagerPerson}
                            idClass={idClass}
                            removeManagerPerson={removeManagerPerson}
                            searchTaskDraw={searchTaskDraw}
                            clearnTaskDraw={clearnTaskDraw}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    classById: state.classById.lop,
    userOfClass: state.classById.user,
    actionClass: state.actionClass,
    isLoading: state.isLoading.isLoading,
    loadingLocal: state.loadingLocal.loadingLocal,
    errors: state.errors,
    showNotify: state.showNotify.isShow,
    users: state.users.users,
    searchDraw: state.taskDraw.search
});
export default connect(
    mapStateToProps,
    {
        getClassById,
        updateInfoClassById,
        closeNotify,
        updateAvatarClassById,
        removeAvatarClass,
        importDssvClassById,
        addClassMemberById,
        editClassMemberById,
        clearErrors,
        deleteClassMemberById,
        deleteClass,
        getUserConditionStatusTrue,
        changeManagerPerson,
        removeManagerPerson,
        searchTaskDraw,
        clearnTaskDraw
    }
)(withStyles(styles)(ClassDetail));
