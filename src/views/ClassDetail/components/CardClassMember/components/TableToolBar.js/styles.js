import { lighten } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        height: 72
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.warning.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.warning.dark
              },
    title: {
        flex: '1 1 100%'
    }
});
export default styles;
