const styles = theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            marginRight: theme.spacing(0.5)
        }
    },
    title: {
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    exportIcon: {
        marginRight: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(1)
    }
});
export default styles;
