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
import { getClassById } from './../../actions/classes';
import {
    updateInfoClassById,
    updateAvatarClassById,
    removeAvatarClass
} from './../../actions/actionClass';
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
        removeAvatarClass
    } = props;

    useEffect(() => {
        getClassById(match.params.id);
    }, [getClassById, match.params.id, actionClass]);
    useEffect(() => {
        if (errors.message === 'CLASS_NOT_FOUND') {
            history.push('/classes');
        }
    }, [errors, history]);
    const setCloseNotify = () => {
        closeNotify();
    };

    if (isLoading) {
        return <LoadingCenter />;
    }
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionClass.isSuccess ? 'success' : 'error'}
                message={actionClass.message}
                openNotify={showNotify}
                setCloseNotify={setCloseNotify}
            />
            <ToolbarClassDetal classById={classById} />
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
                        <CardClassMember classById={classById} />
                    </Grid>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <CardManage userOfClass={userOfClass} />
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
    errors: state.errors,
    showNotify: state.showNotify.isShow
});
export default connect(
    mapStateToProps,
    { getClassById, updateInfoClassById, closeNotify, updateAvatarClassById, removeAvatarClass }
)(withStyles(styles)(ClassDetail));
