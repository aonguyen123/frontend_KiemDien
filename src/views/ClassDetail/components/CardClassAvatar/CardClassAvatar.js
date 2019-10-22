import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Divider,
    Button,
    CardHeader
} from '@material-ui/core';
import { URI } from './../../../../constants/types';
import { LoadingButton } from 'components';
import styles from './styles';

const CardClassAvatar = props => {
    const { classes, className, classById, updateAvatarClassById, errors, removeAvatarClass } = props;
    let [avatar] = useState('');
    const [loadingButtonUpload, setLoadingButtonUpload] = useState(false);
    const [loadingButtonRemove, setLoadingButtonRemove] = useState(false);

    useEffect(() => {
        if(errors)
        {
            setLoadingButtonUpload(false);
        }
    }, [errors]);

    const handleChange = e => {
        setLoadingButtonUpload(true);
        avatar = e.target.files[0];
        if (avatar) {
            updateAvatarClassById(avatar, classById._id);
        }
    };
    const handleRemoveAvatarClass = () => {
        setLoadingButtonRemove(true);
        removeAvatarClass(classById._id);
    }

    return(
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                title="Class avatar"
                subheader="The class avatar can be upload"
            />
            <Divider />
            <CardContent>
                <div className={classes.details}>
                    <Avatar
                        className={classes.avatar}
                        src={
                                classById.hinhdaidien 
                                ? `${URI}/getAvatar/${classById.hinhdaidien}` 
                                : 'http://www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=retro'
                            }
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
                    disabled={loadingButtonUpload}
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
                        {loadingButtonUpload ? <LoadingButton /> : null}
                        Upload avatar
                    </Button>
                </label>
                <Button
                    variant="text"
                    onClick={handleRemoveAvatarClass}
                    disabled={loadingButtonRemove || !classById.hinhdaidien}
                >
                    {loadingButtonRemove ? <LoadingButton /> : null}
                    Remove avatar
                </Button>
            </CardActions>
        </Card>
    );
};
export default withStyles(styles)(CardClassAvatar);
