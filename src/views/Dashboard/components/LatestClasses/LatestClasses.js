import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link as LinkClasses } from 'react-router-dom';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    content: {
        padding: 0
    },
    image: {
        height: 48,
        width: 48
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const LatestProducts = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [products] = useState(mockData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    const menuId = 'primary-search-account-menu';
    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader
                subtitle={`${products.length} in total`}
                title="Latest classes"
            />
            <Divider />
            <CardContent className={classes.content}>
                <List>
                    {products.map((product, i) => (
                        <ListItem
                            divider={i < products.length - 1}
                            key={product.id}
                        >
                            <ListItemAvatar>
                                <img
                                    alt="Product"
                                    className={classes.image}
                                    src={product.imageUrl}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={`Updated ${product.updatedAt.fromNow()}`}
                            />
                            <IconButton
                                edge="end"
                                size="small"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                id={menuId}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Typography variant="button">View detail</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Typography variant="button">Edit</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Typography variant="button">Delete</Typography>
                                </MenuItem>
                            </Menu>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <LinkClasses to="/classes">
                    <Button color="primary" size="small" variant="text">
                        View all <ArrowRightIcon />
                    </Button>
                </LinkClasses>
            </CardActions>
        </Card>
    );
};

LatestProducts.propTypes = {
    className: PropTypes.string
};

export default LatestProducts;
