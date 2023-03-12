import axios, {AxiosResponse} from 'axios';
import Coordinate, {createCoordinateGroups} from '../app/coordinate-generator';

export interface ResponseResult {
  sunrise: string;
  sunset: string;
  day_length: string;
}

interface Response {
  results: ResponseResult;
  status: string;
}

interface DataPoint {
  coordinate: Coordinate;
  responseResult: ResponseResult;
}

export const requestTimesForCoordinate = async (
  coordinate: Coordinate
): Promise<DataPoint> => {
  const baseUrl = 'https://api.sunrise-sunset.org/json';

  const request = await axios
    .get(baseUrl, {
      params: {
        lat: coordinate.latitude.toString(),
        lng: coordinate.longitude.toString(),
        formatted: 0,
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

export const parseResponse = (response: AxiosResponse): ResponseResult => {
  const mainResponse = response.data as Response;
  if (mainResponse && (mainResponse.results as ResponseResult)) {
    return mainResponse.results as ResponseResult;
  } else {
    throw Error(`Error parsing response: \n ${response}`);
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

export const getEarliestSunrise = (dataPoints: DataPoint[]): DataPoint => {
  return dataPoints.reduce((previous, current) =>
    parseSunrise(previous.responseResult) < parseSunrise(current.responseResult)
      ? previous
      : current
  );
};

const parseSunrise = (result: ResponseResult): number => {
  const date = Date.parse(result.sunrise);
  if (date) {
    return date;
  } else {
    throw Error(
      `Error parsing sunrise time for result: \n ${JSON.stringify(
        result.sunrise
      )}`
    );
  }
};

export const printDataForPoint = (dataPoint: DataPoint) => {
  console.log(
    `Data for coordinate: ${dataPoint.coordinate.latitude} : ${dataPoint.coordinate.longitude}`
  );
  console.log(`Sunrise: ${dataPoint.responseResult.sunrise}\n`);
  console.log(`Sunset: ${dataPoint.responseResult.sunset}\n`);
  console.log(`Day length: ${dataPoint.responseResult.day_length}\n\n`);
};
