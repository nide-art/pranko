import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native-web';
import App from '../app/_layout';

// Register the app
AppRegistry.registerComponent('main', () => App);

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container!);

// Render the app
const { element, getStyleElement } = AppRegistry.getApplication('main', {});

// Add styles to head
const styles = getStyleElement();
if (styles) {
  document.head.appendChild(styles);
}

root.render(element);