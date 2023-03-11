import axios, {AxiosResponse} from 'axios';
import Coordinate from '../app/coordinate-generator';

export interface ResponseResult {
  sunrise: string;
  sunset: string;
  day_length: string;
}

interface Response {
  results: ResponseResult;
  status: string;
}

const constructUrlForSinglePoint = (coordinate: Coordinate): URL => {
  const baseUrl = new URL('https://api.sunrise-sunset.org/');

  baseUrl.pathname = '/json';
  baseUrl.searchParams.append('lat', coordinate.latitude.toString());
  baseUrl.searchParams.append('lng', coordinate.longitude.toString());

  return baseUrl;
};

export async function requestSinglePoint(
  coordinate: Coordinate
): Promise<AxiosResponse | void> {
  try {
    return await axios.get(constructUrlForSinglePoint(coordinate).toString());
  } catch (error) {
    console.error(
      `Error requesting times for latitude ${coordinate.latitude} & longitude ${coordinate.longitude}:\n ${error}`
    );
  }
}

export const parseResponse = (response: AxiosResponse): ResponseResult => {
  const mainResponse = response.data as Response;
  if (mainResponse && (mainResponse.results as ResponseResult)) {
    return mainResponse.results as ResponseResult;
  } else {
    throw Error(`Error parsing response: \n ${response}`);
  }
};
