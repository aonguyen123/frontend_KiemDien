const styles = theme => ({
    root: {},
    row: {
        height: '44.5px',
        display: 'flex',
        alignItems: 'center'
    },
    spacer: {
        flexGrow: 1
    },
    cardManageList: {
        padding: theme.spacing(0),
        marginTop: theme.spacing(0)
    },
    changeButton: {
        marginRight: theme.spacing(5)
    },
    managerNotFound: {
        padding: theme.spacing(2)
    }
});
export default styles;