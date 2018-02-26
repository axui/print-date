import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './router';
import './scss/index.css';

ReactDOM.render(
    <AppRouter warnings={false} />,
    document.getElementById('root')
);
