const styles = theme => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '300px'
    },
    stats: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    device: {
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    deviceIcon: {
        color: theme.palette.icon
    },
    paperButton: {
        textTransform: 'none'
    }
});
export default styles;
