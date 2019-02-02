import * as React from 'react';
import DraggableZoom from './lib/DraggableZoom';
import * as sampleImage from "public/assets/images/sample.jpg";

const Demo: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <DraggableZoom imageSrc={sampleImage} />
    </React.Fragment>
  ) 
}

export default Demo;