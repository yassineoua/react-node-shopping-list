import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4d81b7',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: ['Nunito', 'Arial', 'sans-serif'].join(','),
        button: {
            textTransform: "none"
        }
    }
});


export default theme;