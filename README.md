# react-draggable-zoom

Easy to intergrate image zoom with draggability for your react projects.

# Installation
The package can be installed via yarn:

`yarn add react-draggable-zoom`

# Example

```javascript
import * as React from 'react';
import DraggableZoom from 'react-draggable-zoom';
import * as sampleImage from "public/assets/images/sample.jpg";

const Demo: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <DraggableZoom imageSrc={sampleImage} />
    </React.Fragment>
  ) 
}

export default Demo;
```
# Development
The master branch contains the latest version of source code. Clone the repository and play around with included example. To run the example use following commands.

`yarn start`