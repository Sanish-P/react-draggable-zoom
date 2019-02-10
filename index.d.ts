import * as React from 'react';

declare module 'react-draggable-zoom' {
  interface IDraggableZoomProps {
    imageSrc: string;
    zoom?: number;
    disableControls?: boolean;
  }
  const DraggableZoom: React.ComponentType<IDraggableZoomProps>;
  export default DraggableZoom;
}