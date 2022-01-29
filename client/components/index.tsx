import React from 'react';
import ReactDOM from 'react-dom'
import { App } from './app';

addEventListener('load', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})