import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from './../../actions/authentication';
import { closeNotify } from './../../actions/notify';
import { LoadingButton, Notifies } from 'components';
import styles from './styles';

const SignIn = props => {
    const { errors, history, login, classes, auth, showNotify, closeNotify } = props;
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        setLoadingButton(false);
    }, [errors]);
    useEffect(() => {
        if(localStorage.jwtToken)
        {
            history.push('/');
        }
    });

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = e => {
        e.preventDefault();
        setLoadingButton(true);
        login(value, history);
    }
    const setCloseNotify = () => {
        closeNotify();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Notifies
                variant={auth.isSuccess ? 'success' : 'error'}
                message={auth.message}
                openNotify={auth.isSuccess === null ? false : showNotify}
                setCloseNotify={setCloseNotify}
            />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        error={errors.email ? true : false}
                        helperText={
                            errors.email ? errors.email: null
                        }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={errors.password ? true : false}
                        helperText={
                            errors.password ? errors.password : null
                        }
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loadingButton}
                            className={classes.submit}
                            onClick={handleClick}
                        >
                            Sign In
                            {
                                loadingButton && <LoadingButton />
                            }
                        </Button>
                    </div>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                color="primary"
                                component={RouterLink}
                                to="#"
                                underline="none"
                                variant="h6"
                            >
                                {'Forgot password?'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
SignIn.propTypes = {
    errors: PropTypes.object,
    login: PropTypes.func
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    showNotify: state.showNotify.isShow
});
export default connect(mapStateToProps, { login, closeNotify } )(withRouter(withStyles(styles)(SignIn)));