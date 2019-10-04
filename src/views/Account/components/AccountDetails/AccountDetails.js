import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import styles from './styles';
import { LoadingButton } from './../../../../components';

class AccountDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            sdt: this.props.user.sdt,
            city: this.props.user.city,
            country: this.props.user.country,
            
            isLoadingButton: false,
            showErrors: false
        }
    }     
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleClick = () => {
        this.props.setShowNotifies(false);
        this.setState({
            isLoadingButton: true
        });
        const user = this.state;
        user.id = this.props.user._id;
        this.props.updateInfo(user);
    }
    componentDidUpdate(preProps, preState)
    {
        if(preProps.info !== this.props.info)
        {
            this.props.getInfoUser(this.props.user._id);
        }
        if(preProps.user !== this.props.user)
        {
            this.setState({
                isLoadingButton: false,
                showErrors: false
            });
        }
        if (preProps.errors !== this.props.errors) {
            this.setState({
                isLoadingButton: false,
                showErrors: true
            });
        }
    }
    render() {
        const { className, classes, citys, errors } = this.props;
        const { firstName, lastName, email, sdt, city, country, isLoadingButton, showErrors } = this.state;
        return (
                <Card className={clsx(classes.root, className)}>

                    <form autoComplete="off" noValidate>
                        <CardHeader
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        margin="dense"
                                        name="firstName"
                                        onChange={this.handleChange}
                                        value={firstName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        margin="dense"
                                        name="lastName"
                                        onChange={this.handleChange}
                                        value={lastName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        margin="dense"
                                        name="email"
                                        onChange={this.handleChange}
                                        required
                                        value={email}
                                        variant="outlined"
                                        error={(showErrors && errors.email) ? true : false}
                                        helperText={
                                            (showErrors && errors.email) ? `${errors.email}` : null
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
                                        onChange={this.handleChange}
                                        type="number"
                                        value={sdt}
                                        variant="outlined"
                                        error={(showErrors && errors.sdt) ? true : false}
                                        helperText={
                                            (showErrors && errors.sdt) ? `${errors.sdt}` : null
                                        }
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Select City"
                                        margin="dense"
                                        name="city"
                                        onChange={this.handleChange}
                                        required
                                        select
                                        disabled={(citys.length === 0) ? true : false}
                                        SelectProps={{ native: true }}
                                        value={city}
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
                                        onChange={this.handleChange}
                                        required
                                        defaultValue={country}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button 
                                color="primary" 
                                variant="contained" 
                                onClick={this.handleClick}
                                disabled={isLoadingButton ? true : false}
                            >
                                {isLoadingButton && <LoadingButton /> }
                                Save details
                            </Button>
                        </CardActions>
                    </form>
                </Card>
        );
    }
}
AccountDetails.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    user: PropTypes.object
};

export default withStyles(styles)(AccountDetails);
