import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { StatusBullet } from 'components';
import { URI } from './../../../../constants/types'
import styles from './styles';

const statusColors = {
    true: 'success',
    false: 'danger'
};
const ProductCard = props => {
    const { className, classes, lop } = props;
    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.imageContainer}>
                    <img
                        alt="class"
                        className={classes.image}
                        src={lop.hinhdaidien ? 
                            `${URI}/getAvatar/${lop.hinhdaidien}` : 
                            'http://www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=retro'
                        }
                    />
                </div>
                <Typography align="center" gutterBottom variant="h4">
                    {lop.tenlop}
                </Typography>
                <Typography align="center" variant="h6">
                    {lop.malop}
                </Typography>
                <Typography align="center" variant="body1">
                    {lop.mota}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid container justify="space-between">
                    <Grid className={classes.statsItem} item>
                        <AccessTimeIcon className={classes.statsIcon} />
                        <Typography display="inline" variant="body2">
                            {`Created ${moment(lop.thoigiantao).fromNow()}`}
                        </Typography>
                    </Grid>
                    <Grid className={classes.statsItem} item>
                        <div className={classes.statusContainer}>
                            <Typography display="inline" variant="body2">
                                <StatusBullet
                                    className={classes.status}
                                    color={statusColors[lop.managed]}
                                    size="sm"
                                />
                                {lop.managed === true ? 'Completed' : 'Not yet managed'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

ProductCard.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(ProductCard);
