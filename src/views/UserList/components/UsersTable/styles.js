const styles = theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    }
});
export default styles;
