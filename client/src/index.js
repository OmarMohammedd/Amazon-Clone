import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import  Contextprovider  from "./components/context/Contextprovider";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Contextprovider>
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
            <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
</Contextprovider>
);


