import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the 'react-dom/client' module
import App from './components/wrappers/App';

// Add bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Add our style
import './assets/style/index.css';

// Create the root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot instead of render
root.render(
    <App />
);
