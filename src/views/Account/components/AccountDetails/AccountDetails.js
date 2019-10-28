import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { LoadingButton, LoadingLocal } from 'components';
import styles from './styles';

const AccountDetails = props => {
    const {
        className,
        classes,
        errors,
        account,
        updateInfoAccount,
        citys,
        loadingLocal
    } = props;
    const [value, setValue] = useState(account);
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        setLoadingButton(false);
    }, [errors]);

    const handleChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };
    const handleClick = () => {
        setLoadingButton(true);
        updateInfoAccount(value);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <form autoComplete="off" noValidate>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                {loadingLocal ? (
                    <LoadingLocal size={30} />
                ) : (
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="First name"
                                    margin="dense"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={value.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    margin="dense"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={value.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    margin="dense"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={value.email}
                                    variant="outlined"
                                    error={errors.email ? true : false}
                                    helperText={
                                        errors.email ? errors.email : null
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Phone Number"
                                    margin="dense"
                                    name="sdt"
                                    onChange={handleChange}
                                    type="number"
                                    value={value.sdt}
                                    variant="outlined"
                                    error={errors.sdt ? true : false}
                                    helperText={errors.sdt ? errors.sdt : null}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select City"
                                    margin="dense"
                                    name="city"
                                    onChange={handleChange}
                                    required
                                    select
                                    //disabled={(citys.length === 0) ? true : false}
                                    SelectProps={{ native: true }}
                                    value={value.city}
                                    variant="outlined"
                                    rowsMax={10}
                                >
                                    {citys.map(option => (
                                        <option
                                            key={option._id}
                                            value={option.city}
                                        >
                                            {option.city}
                                        </option>
                                    ))} 
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    margin="dense"
                                    name="country"
                                    required
                                    value={value.country}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                )}
                <Divider />
                <CardActions>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={handleClick}
                        disabled={loadingButton}
                    >
                        {loadingButton && <LoadingButton />}
                        Save details
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};
export default withStyles(styles)(AccountDetails);
