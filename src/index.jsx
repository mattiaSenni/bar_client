import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import store from './app/store'
import { Provider } from 'react-redux'

import PageNotFound from './routes/pageNotFound'
import Home from './routes/home'
import Login from './routes/login'
import Carrello from './routes/carrello'
import Menu from './routes/menu'
import Orders from './routes/orders'

import themeLoader from './theme/themeLoader';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

function MyApp() {
  const muiTheme = themeLoader('system')

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/carrello" element={<Carrello />}></Route>
          </Route>
          <Route
            path="/login"
            element={<Login />}
          />
            <Route
              path="*"
              element={<PageNotFound />}
            />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
  
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
