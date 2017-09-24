import {
  ACTIVITES,
  EFFICIENCY,
  SHORTEST_DAY,
  LONGEST_DAY,
  TOTAL_HOURS,
  TOTAL_DAYS,
  AVERAGE_DAY,
  DAYS_OF_WEEK,
  ACTIVITY_HAS_ERRORED,
  ACTIVITY_IS_LOADING,
} from './../constants/actionTypes';
import labels from '../utils/dayLabel';
import formatTime from '../utils/format';

export function activityIsLoading(isLoading) {
  return {
    type: ACTIVITY_IS_LOADING,
    data: isLoading,
  };
}

export function setActivities(activities) {
  return {
    type: ACTIVITES,
    data: activities,
  };
}

export function setEfficiency(efficiency) {
  return {
    type: EFFICIENCY,
    data: efficiency,
  };
}

export function setShortestDay(shortestDay) {
  return {
    type: SHORTEST_DAY,
    data: shortestDay,
  };
}

export function setLongestDay(longestDay) {
  return {
    type: LONGEST_DAY,
    data: longestDay,
  };
}

export function setTotalHours(totalHours) {
  return {
    type: TOTAL_HOURS,
    data: totalHours,
  };
}

export function setTotalDays(totalDays) {
  return {
    type: TOTAL_DAYS,
    data: totalDays,
  };
}

export function setAverageDay(average) {
  return {
    type: AVERAGE_DAY,
    data: average,
  };
}

export function setDaysOfWeek(daysOfWeek) {
  return {
    type: DAYS_OF_WEEK,
    data: daysOfWeek,
  };
}

export function activityHasErrored(error) {
  return {
    type: ACTIVITY_HAS_ERRORED,
    data: error,
  };
}

function getKey(isoDate) {
  const date = new Date(isoDate);
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
  );
  return newDate.getTime();
}

function createMapFromActivities(activities) {
  return activities.reduce((hash, { start, duration }) => {
    const key = getKey(start);
    const value = hash.get(key);
    if (value === undefined) {
      hash.set(key, duration);
    } else {
      hash.set(key, value + duration);
    }
    return hash;
  }, new Map());
}

export function fetchActivities(token) {
  const headers = { headers: { token } };

  return dispatch => {
    dispatch(activityIsLoading(true));
    fetch(
      'https://tu11rbso5b.execute-api.eu-west-1.amazonaws.com/prod/activity',
      headers,
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(({ Items }) => {
        const activities = Items;
        const map = createMapFromActivities(activities);

        let totalHours = 0;
        let totalDays = 0;
        let shortestDay = Number.MAX_VALUE;
        let longestDay = Number.MIN_VALUE;
        let metrics = [];
        let daysOfWeek = [
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
          { duration: 0, days: 0 },
        ];

        map.forEach((value, key) => {
          if (value < shortestDay) {
            shortestDay = value;
          } else if (value > longestDay) {
            longestDay = value;
          }

          const date = new Date(key);
          const day = date.getDay();
          const stat = daysOfWeek[day];
          stat.days++;
          stat.duration += value;

          totalDays++;
          totalHours += value;
          metrics.push({ label: key, value });
        });

        daysOfWeek = daysOfWeek
          .map(({ days, duration }, index) => {
            const day = index === 0 ? 7 : index;
            const value = duration === undefined ? 0 : duration / days;
            return {
              day,
              value,
              label: labels[day - 1],
              formatedValue: formatTime(value),
            };
          })
          .sort((a, b) => a.day - b.day);

        metrics = metrics
          .sort((a, b) => a.label - b.label)
          .map(({ value }) => value);

        const efficiency = metrics.map(value => value * 100 / 8);

        dispatch(setShortestDay(shortestDay));
        dispatch(setLongestDay(longestDay));
        dispatch(setTotalHours(totalHours));
        dispatch(setTotalDays(totalDays));
        dispatch(setAverageDay(totalHours / totalDays));
        dispatch(setDaysOfWeek(daysOfWeek));
        dispatch(setActivities(metrics));
        dispatch(setEfficiency(efficiency));
      })
      .catch(err => {
        console.log(err);
        dispatch(activityHasErrored(true));
      })
      .then(() => dispatch(activityIsLoading(false)));
  };
}
