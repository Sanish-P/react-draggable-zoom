export const getCoordinatesWithInBoundary = (coordinate: number, imageSize: number, zoom: number, containerSize: number) => {
  const boundary = (imageSize * zoom - containerSize)/2;
  const translation = Math.min(boundary, Math.max(-boundary, coordinate));
  return translation;
}