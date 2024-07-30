import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './Font/Noyh/Noyh-Light.woff';
import './Font/Noyh/Noyh-Regular.woff';
import './Font/Noyh/Noyh-Bold.woff';
import './Font/Rubik/Rubik-Light.ttf';
import './Font/Rubik/Rubik-Regular.ttf';
import './Font/Rubik/Rubik-Medium.ttf';
import './Font/Rubik/Rubik-Bold.ttf';



export const history = createBrowserHistory();
history.listen((location, action) => {
  if (["PUSH"].includes(action)) {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
