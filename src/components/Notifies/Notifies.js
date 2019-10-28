import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { amber, green } from '@material-ui/core/colors';
import styles from './styles';

const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    }
}));
function SlideTransitionSuccess(props) {
    const classes = useStyles1();
    return <Slide className={classes.success} {...props} direction="left" />;
};
function SlideTransitionError(props) {
    const classes = useStyles1();
    return <Slide className={classes.error} {...props} direction="left" />
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};
const Notifies = props => {
    const { message, variant, classes, openNotify, setCloseNotify } = props;
    
    const Icon = variantIcon[variant];
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setCloseNotify();
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openNotify}
                autoHideDuration={2000}
                onClose={handleClose}
                TransitionComponent={(variant === 'success') ? SlideTransitionSuccess : SlideTransitionError }
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            >
            </Snackbar>
        </div>
    );
};
export default withStyles(styles)(Notifies);
