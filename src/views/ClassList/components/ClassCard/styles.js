const styles = theme => ({
    root: {},
    imageContainer: {
        height: 64,
        width: 64,
        margin: '0 auto',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%'
    },
    statsItem: {
        display: 'flex',
        alignItems: 'center'
    },
    statsIcon: {
        color: theme.palette.icon,
        marginRight: theme.spacing(1)
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
