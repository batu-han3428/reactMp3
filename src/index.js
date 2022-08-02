import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Routers/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';


const store = configureStore();


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  // </React.StrictMode>
);

reportWebVitals();