import * as React from 'react';
import { getCoordinatesWithInBoundary } from './utils/coordinates';
import ZoomIcon from './ZoomIcon';
import RestoreIcon from './RestoreIcon';
import { containerDivStyle, imageStyle, buttonWrapperDiv, svgWrapperDiv } from './styles';
import ZoomOutIcon from './ZoomOutIcon';

interface ImageContainerState {
  zoom: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

interface ImageContainerProps {
  translation: ICoordinates
  onTranslationChange: (nextTranslation: ICoordinates) => void;
  src: string;
  zoom?: number;
  disableControls?: boolean;
}

class ImageContainer extends React.Component<ImageContainerProps, ImageContainerState> {
  constructor(props: Readonly<ImageContainerProps>) {
    super(props);
    this.state = {
      zoom: this.props.zoom ? this.props.zoom : 1
    }
    this.dragStart = {
      x: 0,
      y: 0
    }
    this.imageSize = {
      width: 0,
      height: 0
    }
    this.containerSize = {
      width: 0,
      height: 0
    }
    this.translationOnDragStart = {
      x: props.translation.x,
      y: props.translation.y
    }
  }
  static getMouseCoordinates = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => ({
    x: Number(event.clientX),
    y: Number(event.clientY)
  })
  dragStart: ICoordinates
  translationOnDragStart: ICoordinates
  imageSize: ISize
  containerSize: ISize
  onZoomClick = () => {
    this.setState((prevState) => ({ zoom: prevState.zoom + 0.2 }))
  }
  onRestoreClick = () => {
    this.props.onTranslationChange({ x: 0, y: 0 });
    this.setState({ zoom: 1 })
  }
  onZoomOutClick = () => {
    this.props.onTranslationChange({ x: 0, y: 0 });
    this.setState((prevState) => ({ zoom: prevState.zoom - 0.2 > 1 ? prevState.zoom - 0.2 : 1 }))
  }
  onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    this.imageSize = {
      width: event.currentTarget.width,
      height: event.currentTarget.height
    }
    this.containerSize = {
      width: event.currentTarget.getBoundingClientRect().width,
      height: event.currentTarget.getBoundingClientRect().height
    }
  }

  registerDragStartCoordinates = ({ x, y }: ICoordinates) => {
    this.dragStart = {
      x,
      y
    }
    this.translationOnDragStart = {
      x: this.props.translation.x,
      y: this.props.translation.y
    }
  }

  onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    this.registerDragStartCoordinates(ImageContainer.getMouseCoordinates(event))
  }

  onMouseUp = () => {
    this.clearEventListeners();
  }

  onMouseMove = (event: MouseEvent) => {
    const currentCoordinates = ImageContainer.getMouseCoordinates(event);

    if (currentCoordinates.x && currentCoordinates.y) {
      const movementOffsetX = currentCoordinates.x - this.dragStart.x;
      const movementOffsetY = currentCoordinates.y - this.dragStart.y;

      const nextTranslation = {
        x: this.translationOnDragStart.x + movementOffsetX,
        y: this.translationOnDragStart.y + movementOffsetY
      }

      const boundedTranslation: ICoordinates = {
        x: getCoordinatesWithInBoundary(nextTranslation.x, this.imageSize.width, this.state.zoom, this.containerSize.width),
        y: getCoordinatesWithInBoundary(nextTranslation.y, this.imageSize.height, this.state.zoom, this.containerSize.height)
      }

      this.props.onTranslationChange(boundedTranslation)

    }
  }

  clearEventListeners = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('moseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.clearEventListeners();
  }

  componentDidUpdate(prevProps: Readonly<ImageContainerProps>) {
    if (prevProps !== this.props) {
      this.handleUpdate(prevProps)
    }
  }

  handleUpdate = (prevProps: Readonly<ImageContainerProps>) => {
    if (this.props.zoom && prevProps.zoom && prevProps.zoom !== this.props.zoom) {
      let zoomDiff = this.props.zoom - prevProps.zoom;
      if (zoomDiff < 0) {
        this.props.onTranslationChange({ x: 0, y: 0 })
      }
      this.setState({
        zoom: this.props.zoom
      })
    }
  }

  render() {
    const { zoom } = this.state;
    const { translation: { x, y }, disableControls = false } = this.props;
    return (
      <div style={{ position: 'absolute' }}>
        <div style={containerDivStyle} onMouseDown={this.onMouseDown}>
          <img onLoad={this.onImageLoad} style={{ ...imageStyle, transform: `translate(${x}px, ${y}px) scale(${zoom})` }} src={this.props.src} />
        </div>
        <div style={buttonWrapperDiv}>
          {!disableControls ? (
            <React.Fragment>
              <div style={svgWrapperDiv} onClick={this.onZoomClick}>
                <ZoomIcon />
              </div>
              <div style={svgWrapperDiv} onClick={this.onRestoreClick}>
                <RestoreIcon />
              </div>
              <div style={svgWrapperDiv} onClick={this.onZoomOutClick}>
                <ZoomOutIcon />
              </div>
            </React.Fragment>
          ): (this.props.children)}
        </div>
      </div>
    )
  }
}

export default ImageContainer;