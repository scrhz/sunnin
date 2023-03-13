export default interface Coordinate {
  latitude: number;
  longitude: number;
}

const randomCoordinate = (): Coordinate => {
  const coordinate: Coordinate = {
    latitude: (Math.random() - 0.5) * 180,
    longitude: (Math.random() - 0.5) * 360,
  };

  return coordinate;
};

export const generateRandomCoordinates = (quantity: number): Coordinate[] => {
  return Array(quantity).fill(null).map(randomCoordinate);
};

export const createCoordinateGroups = (total: number): Coordinate[][] => {
  const groupSize = 5;
  const coordinates = generateRandomCoordinates(total);
  let coordinateGroups = [];

  for (let index = 0; index < coordinates.length; index += groupSize) {
    const group = coordinates.slice(index, index + groupSize);
    coordinateGroups.push(group);
  }

  return coordinateGroups;
};
