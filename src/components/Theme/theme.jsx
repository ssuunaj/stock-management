
import { createTheme } from '@mui/material/styles';
import { orange, green } from '@mui/material/colors';

const theme = createTheme({
 components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: orange[500],
              color: '#fff',
              "&:hover":{
                    backgroundColor: orange[300],
              }
            }),
        }),
        //  root: {
        //   // Some CSS
        //   // backgroundColor:'red'
        //   '&:hover':{
        //      backgroundColor:'red'
        //   }
        
        // },
      },
    },
  },
palette: {
    primary: {
      main: orange[500],
    },
     secondary: {
      main: green[500],
      light: green[400]
    },
  },
})

export default theme;