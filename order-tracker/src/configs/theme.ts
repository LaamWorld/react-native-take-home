import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		text: {
			primary: '#292929',
			secondary: '#5f6368',
		},
	},
	typography: {
		fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
	},
});
