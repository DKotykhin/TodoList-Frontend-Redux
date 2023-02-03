import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";

import { ToastContainer, Flip } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "./store/store";
import { router } from './App';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Mulish',
            'Inter',
            'Arial',
            'Segoe UI',
            'Roboto',
            'sans-serif'
        ].join(','),
    }
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                transition={Flip}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </ThemeProvider>
    </Provider>
);