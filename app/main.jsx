import './stylesheets/main.css';
import React from 'react';
import App from './src/app';

renderShell();

function renderShell() {
  var shell = document.createElement('div');
  shell.className = 'app-shell';
  document.body.appendChild(shell);
  React.render(<App />, shell);
}