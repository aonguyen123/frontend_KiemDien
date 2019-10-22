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
    outlinedPrimary: {
        borderColor: 'green',
        color: 'green'
    },
    outlinedSecondary: {
        borderColor: 'red',
        color: 'red'
    },
    spacer: {
        flexGrow: 1
    },
    fab: {
        margin: theme.spacing(1)
    }
});
export default styles;
