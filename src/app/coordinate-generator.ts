export default interface Coordinate {
  latitude: number;
  longitude: number;
}

export const generateCoordinates = (quantity: number): Coordinate[] => {
  return Array(quantity).fill(null).map(randomCoordinate);
};

const randomCoordinate = (): Coordinate => {
  const coordinate: Coordinate = {
    latitude: Math.random() * 90,
    longitude: Math.random() * 180,
  };

  return coordinate;
};
