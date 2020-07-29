import React from 'react';
import { hot } from 'react-hot-loader';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import MainRouter from './mainRouter';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8eacbb',
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e7ff8c',
      main: '#b2ff59',
      dark: '#7ecb20',
      contrastText: '#000',
    },
    openTitle: blueGrey['400'],
    protectedTitle: lightGreen['400'],
    type: 'light',
  },
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default hot(module)(App);
