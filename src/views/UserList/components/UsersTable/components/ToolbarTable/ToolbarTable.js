import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const ToolbarTable = props => {
    const { numSelected, classes, deleteUsers, selectedUsers } = props;
    if(numSelected === 0)
    {
        return null;
    }
    const handleClick = () => {
        deleteUsers(selectedUsers);
    };
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 && (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  };
  export default withStyles(styles)(ToolbarTable);