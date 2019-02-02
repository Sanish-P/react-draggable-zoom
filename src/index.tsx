import * as React from 'react';
import { render } from 'react-dom';
import Demo from './Demo';

const renderComponent = () => {
  const rootDiv = document.getElementById('app');
  if(rootDiv) {
    render(<Demo />, rootDiv)
  }
}

renderComponent();