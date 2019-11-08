import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Avatar,
    TablePagination,
    FormControlLabel,
    CircularProgress
} from '@material-ui/core';
import { SearchInput, LoadingLocal } from 'components';
import { URI } from './../../../../constants/types';
import Drawer from '@material-ui/core/Drawer';
import styles from './styles';

const DrawClassAssignes = props => {
    const {
        classes,
        open,
        handleChangePerson,
        loadingLocal,
        users,
        idClass,
        changeManagerPerson
    } = props;
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState({ load: '' });

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
            <Drawer
                anchor="right"
                open={open}
                onClose={handleChangePerson('right', false)}
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
                                                src={
                                                    user.avatar
                                                        ? `${URI}/getAvatar/${user.avatar}`
                                                        : `//www.gravatar.com/avatar/f8aef9003205946523250a062b54bbb6?s=200&r=pg&d=mm`
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="h6">
                                                {user.name}
                                            </Typography>
                                        }
                                    />
                                    {loading.load === user._id && (
                                        <CircularProgress
                                            size={20}
                                            color="primary"
                                        />
                                    )}
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
            </Drawer>
        </div>
    );
};
export default withStyles(styles)(DrawClassAssignes);
