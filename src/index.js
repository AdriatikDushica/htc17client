import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
