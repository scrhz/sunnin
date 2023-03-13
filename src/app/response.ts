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
    parseSunrise(previous) < parseSunrise(current) ? previous : current
  );
};

const parseSunrise = (dataPoint: DataPoint): number => {
  const date = Date.parse(dataPoint.responseResult.sunrise);
  if (date != null && date != undefined) {
    return date;
  } else {
    throw Error(
      `Error parsing sunrise time for result: \n ${JSON.stringify(
        dataPoint.responseResult.sunrise
      )}\n Latitude: ${dataPoint.coordinate.latitude} \n Longitude: ${
        dataPoint.coordinate.longitude
      }`
    );
  }
};

export const printDataForPoint = (dataPoint: DataPoint) => {
  console.log(
    `Data for coordinate: ${dataPoint.coordinate.latitude} : ${dataPoint.coordinate.longitude}`
  );
  console.log(`Sunrise: ${dataPoint.responseResult.sunrise}`);
  console.log(`Sunset: ${dataPoint.responseResult.sunset}`);
  console.log(`Day length: ${dataPoint.responseResult.day_length}\n`);
};
