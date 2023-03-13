import {createPoints} from './request';
import {getEarliestSunrise, printDataForPoint} from './response';

const findSunTimes = async () => {
  const points = await createPoints(100);

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
