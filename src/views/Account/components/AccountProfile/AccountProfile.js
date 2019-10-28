import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from '@material-ui/core';
import { URI } from './../../../../constants/types';
import { LoadingButton } from 'components';
import styles from './styles';

const AccountProfile = props => {
    const { className, classes, account, uploadPictureAccount, removePictureAccount } = props;
    let [avatar] = useState('');
    const [loadingButtonUpload, setLoadingButtonUpload] = useState(false);
    const [loadingButtonRemove, setLoadingButtonRemove] = useState(false);

    const profileComplete = account => {
        let complete = 0;
            if (account.firstName) {
                complete += 20;
            }
            if (account.lastName) {
                complete += 20;
            }
            if (account.sdt) {
                complete += 20;
            }
            if (account.city) {
                complete += 20;
            }
            if (account.avatar) {
                complete += 20;
            }
            return complete;
    };
    const handleChange = e => {
        setLoadingButtonUpload(true);
        avatar = e.target.files[0];
        if (avatar) {
            uploadPictureAccount(avatar, account._id);
        }
    };
    const handleRemoveAvatar = () => {
        setLoadingButtonRemove(true);
        removePictureAccount(account._id);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography gutterBottom variant="h2">
                            {`${account.firstName} ${account.lastName}`}
                        </Typography>
                        <Typography
                            className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {account.city}, {account.country}
                        </Typography>
                        <Typography
                            className={classes.dateText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {moment().format('hh:mm A')} ({'GTM-7'})
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={
                            account.avatar
                                ? `${URI}/getAvatar/${account.avatar}`
                                : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                        }
                    />
                </div>
                <div className={classes.progress}>
                    <Typography variant="body1">
                        {`Profile Completeness: ${profileComplete(account)}%`}
                    </Typography>
                    <LinearProgress
                        value={profileComplete(account)}
                        variant="determinate"
                    />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="text-button-file"
                    multiple
                    type="file"
                    onChange={handleChange}
                    //disabled={isLoadingButtonUpload ? true : false}
                    value=""
                />
                <label htmlFor="text-button-file">
                    <Button
                        component="span"
                        className={classes.uploadButton}
                        color="primary"
                        variant="text"
                        disabled={loadingButtonUpload}
                    >
                        {loadingButtonUpload && <LoadingButton />}
                        Upload avatar
                    </Button>
                </label>
                <Button 
                    variant="text" 
                    onClick={handleRemoveAvatar}
                    disabled={loadingButtonRemove}
                >
                    {loadingButtonRemove && <LoadingButton />}
                    Remove avatar
                </Button>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(AccountProfile);