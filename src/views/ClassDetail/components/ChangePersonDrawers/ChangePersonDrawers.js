import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './styles';

const ChangePersonDrawers = props => {
    const { classes, handleChangePerson, open } = props;

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <div>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={handleChangePerson('right', false)}
                onOpen={handleChangePerson('right', true)}
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS}
            >
                <div className={classes.list}>
                    <h1>hello</h1>
                    <h1>hello</h1>
                    <h1>hello</h1>
                    <h1>hello</h1>
                    <h1>hello</h1>
                </div>
            </SwipeableDrawer>
        </div>
    );
};
export default withStyles(styles)(ChangePersonDrawers);
