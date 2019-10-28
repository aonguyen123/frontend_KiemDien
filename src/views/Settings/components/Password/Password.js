import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from '@material-ui/core';
import { LoadingButton } from 'components';
import styles from './styles';

const Password = props => {
    const { className, classes, updatePassword, errors, account, actionAccount } = props;

    const [values, setValues] = useState({
        password: '',
        password_confirm: ''
    });
    const [loadingButton, setLoadingButton] = useState(false);
    useEffect(() => {
        setLoadingButton(false);
    }, [errors, actionAccount]);

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const handleClick = () => {
        setLoadingButton(true);
        updatePassword(account._id, values);
    }
    return (
        <Card className={clsx(classes.root, className)}>
            <form>
                <CardHeader subheader="Update password" title="Password" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        variant="outlined"
                        error={errors.password ? true : false}
                        helperText = {
                            errors.password ? errors.password : null
                        }
                    />
                    <TextField
                        fullWidth
                        label="Confirm password"
                        name="password_confirm"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="password"
                        variant="outlined"
                        error={errors.password_confirm ? true : false}
                        helperText = {
                            errors.password_confirm ? errors.password_confirm : null
                        }
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button 
                        type="submit"
                        color="primary" 
                        variant="outlined"
                        onClick={handleClick}
                        disabled={loadingButton}
                    >
                        {loadingButton && <LoadingButton />}
                        Update
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Password.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Password);
