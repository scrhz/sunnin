import axios, {AxiosResponse} from 'axios';

const baseUrl = new URL('https://api.sunrise-sunset.org/');

export async function requestSinglePoint(
  latitude: number,
  longitude: number
): Promise<AxiosResponse | null> {
  baseUrl.pathname = '/json';
  baseUrl.searchParams.append('lat', latitude.toString());
  baseUrl.searchParams.append('lng', longitude.toString());

  try {
    return await axios.get(baseUrl.toString());
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}
