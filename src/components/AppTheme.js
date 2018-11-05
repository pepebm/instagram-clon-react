import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#000000'
        }
    },
    typography: {
        useNextVariants: true,
    }
});

export default Theme;