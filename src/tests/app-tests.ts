import test from 'node:test';
import assert from 'node:assert';
import {requestSinglePoint} from '../app/request';

test('api is online & responding', async () => {
  const response = await requestSinglePoint(0, 0);

  console.log(response?.data);

  assert(response?.data != null || response?.data != undefined);
  assert(response.status >= 200 || response.status <= 299);
});

test('api returns expected response format', () => {
  //Externally managed API could be changed without warning.
  //This would increase changes of catching changes to requirements in CI rather than relying on them being caught in release/manual testing
  assert.fail();
});

test('api returns valid response for missing coordinates', () => {
  assert.fail();
});

test('generates exactly 100 coordinates in total', () => {
  assert.fail();
});

test('only requests sun times for 5 coordinates at a time', () => {
  assert.fail();
});

test('outputs earliest sunrise from all responses', () => {
  assert.fail();
});
