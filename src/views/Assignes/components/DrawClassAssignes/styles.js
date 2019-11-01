const styles = theme => ({
    list: {
        width: 280
    },
    search: {
        padding: theme.spacing(2)
    },
    drawHeader: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    nameContainer: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(1.5),
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    pagination: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});
export default styles;
