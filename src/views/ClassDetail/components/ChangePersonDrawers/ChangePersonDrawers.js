import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    SwipeableDrawer,
    Avatar,
    TablePagination,
    FormControlLabel,
    CircularProgress
} from '@material-ui/core';
import { SearchInput, LoadingLocal } from 'components';
import { URI } from './../../../../constants/types';
import styles from './styles';

const ChangePersonDrawers = props => {
    const {
        classes,
        handleChangePerson,
        open,
        loadingLocal,
        users,
        changeManagerPerson,
        idClass,
    } = props;
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState({ load: '' });
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClick = (event, id) => {
        setLoading({
            ...loading,
            load: id
        });
        changeManagerPerson(id, idClass);
    };
    
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
                    <div className={classes.search}>
                        <SearchInput placeholder="Search person" />
                    </div>
                    <div className={classes.drawHeader}>
                        <Typography variant="h5">Change manager</Typography>
                    </div>
                    {loadingLocal ? (
                        <LoadingLocal size={30} />
                    ) : (
                        users
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(user => (
                                <div
                                    className={classes.nameContainer}
                                    key={user._id}
                                >
                                    <FormControlLabel
                                        onClick={event =>
                                            handleClick(event, user._id)
                                        }
                                        control={
                                            <Avatar
                                                className={classes.avatar}
                                                src={`${URI}/getAvatar/${user.avatar}`}
                                            />
                                        }
                                        label={
                                            <Typography variant="h6">
                                                {user.name}
                                            </Typography>
                                        }
                                    />
                                    { loading.load === user._id && <CircularProgress size={20} color='primary' /> }
                                </div>
                            ))
                    )}
                    <div className={classes.pagination}>
                        <TablePagination
                            component="div"
                            count={users.length}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[]}
                            backIconButtonProps={{
                                'aria-label': 'previous page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page'
                            }}
                            labelRowsPerPage=""
                        />
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    );
};
export default withStyles(styles)(ChangePersonDrawers);
