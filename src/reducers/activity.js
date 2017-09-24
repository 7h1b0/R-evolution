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

export function activities(state = [], action) {
  switch (action.type) {
    case ACTIVITES:
      return action.data;

    default:
      return state;
  }
}

export function efficiency(state = [], action) {
  switch (action.type) {
    case EFFICIENCY:
      return action.data;

    default:
      return state;
  }
}

export function shortestDay(state = 0, action) {
  switch (action.type) {
    case SHORTEST_DAY:
      return action.data;

    default:
      return state;
  }
}

export function longestDay(state = 0, action) {
  switch (action.type) {
    case LONGEST_DAY:
      return action.data;

    default:
      return state;
  }
}

export function totalHours(state = 0, action) {
  switch (action.type) {
    case TOTAL_HOURS:
      return action.data;

    default:
      return state;
  }
}

export function totalDays(state = 0, action) {
  switch (action.type) {
    case TOTAL_DAYS:
      return action.data;

    default:
      return state;
  }
}

export function averageDay(state = 0, action) {
  switch (action.type) {
    case AVERAGE_DAY:
      return action.data;

    default:
      return state;
  }
}

export function daysOfWeek(state = [], action) {
  switch (action.type) {
    case DAYS_OF_WEEK:
      return action.data;

    default:
      return state;
  }
}

export function activityHasErrored(state = false, action) {
  switch (action.type) {
    case ACTIVITY_HAS_ERRORED:
      return action.data;

    default:
      return state;
  }
}

export function activityIsLoading(state = false, action) {
  switch (action.type) {
    case ACTIVITY_IS_LOADING:
      return action.data;

    default:
      return state;
  }
}
