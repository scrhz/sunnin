import test from 'node:test';
import assert from 'node:assert';
import {requestTimesForCoordinates, parseResponse} from '../app/request';
import {generateCoordinates} from '../app/coordinate-generator';
import {AxiosResponse} from 'axios';

test('api is online & responding', async () => {
  const responses = (await requestTimesForCoordinates([
    {
      latitude: 0,
      longitude: 0,
    },
  ])) as AxiosResponse[];

  assert(responses.length, 'no response returned');
  assert(
    responses[0].data != null || responses[0].data != undefined,
    'response contains no data'
  );
  assert(
    responses[0].status >= 200 || responses[0].status <= 299,
    'response status is unsuccessful'
  );
});

test('api response parses to expected response format', async () => {
  const responses = (await requestTimesForCoordinates([
    {
      latitude: 0,
      longitude: 0,
    },
  ])) as AxiosResponse[];
  const result = parseResponse(responses[0]);

  assert(
    result != null || result != undefined,
    'result was not parsed as valid object'
  );
  assert(
    result.sunrise != null || result.sunrise != undefined,
    'sunrise was not parsed as valid string'
  );
  assert(
    result.sunset != null || result.sunset != undefined,
    'sunset was parsed as valid string'
  );
  assert(
    result.day_length != null || result.day_length != undefined,
    'day_length could not be parsed as valid string'
  );
});

test('generates exactly 100 coordinates in total', () => {
  const coordinates = generateCoordinates(100);

  assert(coordinates.length === 100);
});

test('only requests sun times for 5 coordinates at a time', () => {
  assert.fail();
});

test('outputs earliest sunrise from all responses', () => {
  assert.fail();
});
