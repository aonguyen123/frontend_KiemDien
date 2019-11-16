import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { getPresencesDetail } from './../../actions/presencesDetail';
import { deletePresenceMember } from './../../actions/actionPresenceDetail';
import { closeNotify } from './../../actions/notify';
import { LoadingCenter, Notifies } from 'components';
import { PresencesDetailToolbar, PresencesTable } from './components';
import styles from './styles';

const PresencesDetail = props => {
    const {
        classes,
        isLoading,
        presenceDetailClass,
        getPresencesDetail,
        match,
        history,
        showNotify,
        deletePresenceMember,
        actionPresenceDetail,
        closeNotify,
    } = props;

    useEffect(() => {
        getPresencesDetail(match.params.id, history);
    }, [getPresencesDetail, match.params.id, history, actionPresenceDetail]);

    const setCloseNotify = () => {
        closeNotify();
    };

    if (isLoading) return <LoadingCenter />;
    return (
        <div className={classes.root}>
            <Notifies
                variant={actionPresenceDetail.isSuccess ? 'success' : 'error'}
                message={actionPresenceDetail.message}                
                openNotify={actionPresenceDetail.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <PresencesDetailToolbar 
                presenceDetailClass={presenceDetailClass}
            />
            <div className={classes.content}>
                <Grid container>
                    <Grid item lg={12} md={12} xl={12} xs={12}> 
                        <PresencesTable 
                            presenceDetailClass={presenceDetailClass} 
                            deletePresenceMember={deletePresenceMember}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    presenceDetailClass: state.presenceDetailClass,
    isLoading: state.isLoading.isLoading,
    actionPresenceDetail: state.actionPresenceDetail,
    showNotify: state.showNotify.isShow,
});
export default connect(
    mapStateToProps,
    { getPresencesDetail, deletePresenceMember, closeNotify }
)(withStyles(styles)(PresencesDetail));
