import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme} from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    gun1: "#253237",
    mint1: "#F0F7F4",
    wenge1: "#705D56",
  },
  styles: {
    global: {
      ":root": {
        "--blue": "#19243c",
        "--white": "#fff",
        "--green": "#2ccf6d",
      },
      html: {
        height: "100%",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Nunito Sans",
        color: "var(--blue)",
        fontSize: "1em",
      },
      button: {
        fontFamily: "Nunito Sans",
      },
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);