import axios from 'axios';
import Coordinate, {createCoordinateGroups} from '../app/coordinate-generator';
import {DataPoint, parseResponse} from './response';

export const requestTimesForCoordinate = async (
  coordinate: Coordinate
): Promise<DataPoint> => {
  const baseUrl = 'https://api.sunrise-sunset.org/json';

  const request = await axios
    .get(baseUrl, {
      params: {
        lat: coordinate.latitude.toString(),
        lng: coordinate.longitude.toString(),
        formatted: 1,
      },
    })
    .catch((error) => {
      throw Error(
        `Error requesting coordinate of latitude ${coordinate.latitude} longitude ${coordinate.longitude}: \n${error}`
      );
    });

  return {
    coordinate,
    responseResult: parseResponse(request),
  };
};

export const groupRequestsForCoordinates = async (
  coordinates: Coordinate[]
): Promise<DataPoint[]> => {
  const coordinateRequests = coordinates.map((coordinate) =>
    requestTimesForCoordinate(coordinate)
  );

  const batchResult = await Promise.all(coordinateRequests);

  if (batchResult) {
    return batchResult;
  } else {
    throw Error(`Error assigning responses as DataPoints`);
  }
};

export const createPoints = async (
  numberOfPoints: number
): Promise<DataPoint[]> => {
  const groups = createCoordinateGroups(numberOfPoints);
  let dataPoints: DataPoint[][] = [];

  for (const group of groups) {
    const points = await groupRequestsForCoordinates(group);
    dataPoints.push(points);
  }

  return dataPoints.flat();
};
