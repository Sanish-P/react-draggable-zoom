import * as React from 'react';
import { render } from 'react-dom';
import DraggableZoom from './DraggableZoom';

const renderComponent = () => {
  const rootDiv = document.getElementById('app');
  if(rootDiv) {
    render(<DraggableZoom />, rootDiv)
  }
}

renderComponent();