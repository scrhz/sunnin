import {createPoints, getEarliestSunrise, printDataForPoint} from './request';

const findSunTimes = async () => {
  const points = await createPoints(1);

  points.forEach((point) => printDataForPoint(point));

  const earliestSunrisePoint = getEarliestSunrise(points);

  console.log(
    `Earliest sunrise is for ${earliestSunrisePoint.coordinate.latitude} : ${earliestSunrisePoint.coordinate.longitude}`
  );
  console.log(`Sun rises at ${earliestSunrisePoint.responseResult.sunrise}`);
  console.log(
    `Length of day is ${earliestSunrisePoint.responseResult.day_length}`
  );
};

findSunTimes();
