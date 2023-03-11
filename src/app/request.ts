import axios, {AxiosResponse} from 'axios';

export interface ResponseResult {
  sunrise: string;
  sunset: string;
  day_length: string;
}

interface Response {
  results: ResponseResult;
  status: string;
}

export async function requestSinglePoint(
  latitude: number,
  longitude: number
): Promise<AxiosResponse | void> {
  const baseUrl = new URL('https://api.sunrise-sunset.org/');

  baseUrl.pathname = '/json';
  baseUrl.searchParams.append('lat', latitude.toString());
  baseUrl.searchParams.append('lng', longitude.toString());

  try {
    return await axios.get(baseUrl.toString());
  } catch (error) {
    console.error(
      `Error requesting times for latitude ${latitude} & longitude ${longitude}:\n ${error}`
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
