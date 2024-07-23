import type { Preview } from "@storybook/react";
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
  }
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider theme={theme}>
          <BrowserRouter >
            <Story />
          </BrowserRouter>
        </ThemeProvider>
      )
    }
  ],
  loaders: [mswLoader],
};

export default preview;
