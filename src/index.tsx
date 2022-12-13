import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import CssBaseline from '@mui/material/CssBaseline';

import store from "./store/store";
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
);