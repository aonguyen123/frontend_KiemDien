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
    const { className, classes, user, updatePassword, errors, info } = props;

    const [values, setValues] = useState({
        password: '',
        confirm: '',
        isLoadingButton: false
    });
    useEffect(() => {
        if(Object.entries(info).length > 0)
        {
            setValues({
                password: values.password,
                confirm: values.confirm,
                isLoadingButton: false
            });
        }
        if(Object.entries(errors).length > 0)
        {
            setValues({
                password: values.password,
                confirm: values.confirm,
                isLoadingButton: false,
            });
        }
    },[info, errors, values.password, values.confirm]);
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const handleClick = (User) => {
        setValues({
            ...values,
            isLoadingButton: true
        })
        const user = {};
        user.password = values.password;
        user.password_confirm = values.confirm;
        user.id = User._id;
        updatePassword(user);
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
                        value={values.password}
                        variant="outlined"
                        error={errors.password ? true : false}
                        helperText = {
                            errors.password ? `${errors.password}` : null
                        }
                    />
                    <TextField
                        fullWidth
                        label="Confirm password"
                        name="confirm"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="password"
                        value={values.confirm}
                        variant="outlined"
                        error={errors.password_confirm ? true : false}
                        helperText = {
                            errors.password_confirm ? `${errors.password_confirm}` : null
                        }
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button 
                        type="submit"
                        color="primary" 
                        variant="outlined"
                        onClick={() => handleClick(user)}
                        disabled={values.isLoadingButton ? true : false}
                    >
                        {values.isLoadingButton && <LoadingButton />}
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
