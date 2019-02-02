import * as React from "react";
import ImageContainer, { ICoordinates} from './Image';

interface IDraggableZoomState {
  translation: ICoordinates
}

interface IDraggableZoomProps {
  imageSrc: string;
  zoom?: number;
  disableControls?: boolean;
}

class DraggableZoom extends React.Component<IDraggableZoomProps, IDraggableZoomState> {
  constructor(props: Readonly<IDraggableZoomProps>) {
    super(props);
    this.state = {
      translation: {
        x: 0,
        y: 0
      }
    }
  }
  onTranslationChange = ({x, y}: ICoordinates) => {
    this.setState({
      translation: {
        x,
        y
      }
    })
  }
  render() {
    const { imageSrc, zoom, disableControls } = this.props;
    return (
      <ImageContainer src={imageSrc} zoom={zoom} children={this.props.children} disableControls={disableControls} translation={this.state.translation} onTranslationChange={this.onTranslationChange} />
    )
  }
}

export default DraggableZoom;