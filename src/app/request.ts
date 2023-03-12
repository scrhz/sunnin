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

const constructUrlForCoordinate = (coordinate: Coordinate): URL => {
  const baseUrl = new URL('https://api.sunrise-sunset.org/');

  baseUrl.pathname = '/json';
  baseUrl.searchParams.append('lat', coordinate.latitude.toString());
  baseUrl.searchParams.append('lng', coordinate.longitude.toString());

  return baseUrl;
};

export async function requestTimesForCoordinates(
  coordinates: Coordinate[]
): Promise<AxiosResponse[] | void> {
  const urls = coordinates.map((coordinate) => {
    return constructUrlForCoordinate(coordinate);
  });

  const requestUrls = urls.map((url) => {
    return axios.get(url.toString());
  });

  try {
    return await axios.all(requestUrls).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.error(`Error requesting times for urls ${requestUrls}:\n ${error}`);
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
