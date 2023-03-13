import test from 'node:test';
import assert from 'node:assert';
import {requestTimesForCoordinate} from '../app/request';
import {
  createCoordinateGroups,
  generateRandomCoordinates,
} from '../app/coordinate-generator';
import {DataPoint, getEarliestSunrise} from '../app/response';

test('api response is parsed to expected format', async () => {
  const dataPoint = await requestTimesForCoordinate({
    latitude: 0,
    longitude: 0,
  });

  assert(dataPoint, 'no response returned');
  assert(
    dataPoint.coordinate != null || dataPoint.coordinate != undefined,
    'response '
  );

  assert(
    dataPoint.responseResult.sunrise != null ||
      dataPoint.responseResult.sunrise != undefined,
    'sunrise was not parsed as valid string'
  );
  assert(
    dataPoint.responseResult.sunset != null ||
      dataPoint.responseResult.sunset != undefined,
    'sunset was parsed as valid string'
  );
  assert(
    dataPoint.responseResult.day_length != null ||
      dataPoint.responseResult.day_length != undefined,
    'day_length could not be parsed as valid string'
  );
});

test('generates exactly 100 coordinates in total', () => {
  const coordinates = generateRandomCoordinates(100);

  assert(coordinates.length === 100);
});

test('groups for 5 data points at a time and retains remainder', () => {
  const groups = createCoordinateGroups(9);

  assert(
    groups.find((group) => group.length === 5),
    'did not split groups to requirement of 5 coordinates'
  );
  assert(
    groups.find((group) => group.length === 4),
    'did not create group with <5 remaining coordinates'
  );
});

test('outputs earliest sunrise from all responses', () => {
  const earliest: DataPoint = {
    responseResult: {
      sunrise: '2015-05-21T05:05:35+00:00',
      sunset: '2015-05-21T05:05:35+00:00',
      day_length: '0',
    },
    coordinate: {latitude: 0, longitude: 0},
  };

  const later: DataPoint = {
    responseResult: {
      sunrise: '2015-05-21T12:05:35+00:00',
      sunset: '2015-05-21T05:05:35+00:00',
      day_length: '0',
    },
    coordinate: {latitude: 0, longitude: 0},
  };

  const latest: DataPoint = {
    responseResult: {
      sunrise: '2015-05-21T12:10:35+00:00',
      sunset: '2015-05-21T05:05:35+00:00',
      day_length: '0',
    },
    coordinate: {latitude: 0, longitude: 0},
  };

  const dataPoints = [later, earliest, latest];

  const earliestSunrisePoint = getEarliestSunrise(dataPoints);

  assert.deepEqual(
    earliestSunrisePoint,
    earliest,
    'did not return earliest sunrise from collection of datapoints'
  );
});
