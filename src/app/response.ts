import Coordinate from '../app/coordinate-generator';
import {AxiosResponse} from 'axios';

export interface ResponseResult {
  sunrise: string;
  sunset: string;
  day_length: string;
}

export interface Response {
  results: ResponseResult;
  status: string;
}

export interface DataPoint {
  coordinate: Coordinate;
  responseResult: ResponseResult;
}

export const parseResponse = (response: AxiosResponse): ResponseResult => {
  const mainResponse = response.data as Response;
  if (mainResponse && (mainResponse.results as ResponseResult)) {
    return mainResponse.results as ResponseResult;
  } else {
    throw Error(`Error parsing response: \n ${response}`);
  }
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
