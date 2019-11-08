import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import styles from './styles';

const NotFound = props => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={1}>
                <Grid item lg={7} xs={12}>
                    <div className={classes.content}>
                        <Typography variant="h1">
                            404: The page you are looking for isn’t here
                        </Typography>
                        <Typography variant="subtitle2">
                            You either tried some shady route or you came here
                            by mistake. Whichever it is, try using the
                            navigation
                        </Typography>
                        <img
                            alt="Under development"
                            className={classes.image}
                            src="/images/undraw_page_not_found_su7k.svg"
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
export default withStyles(styles)(NotFound);
