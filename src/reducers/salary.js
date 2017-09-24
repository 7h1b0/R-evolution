import {
  SALARIES,
  RATECARD,
  SALARIES_IS_LOADING,
  SALARIES_HAS_ERRORED,
} from './../constants/actionTypes';

export function salaries(state = [], action) {
  switch (action.type) {
    case SALARIES:
      return action.data;

    default:
      return state;
  }
}

export function ratecard(state = [], action) {
  switch (action.type) {
    case RATECARD:
      return action.data;

    default:
      return state;
  }
}

export function salariesIsLoading(state = false, action) {
  switch (action.type) {
    case SALARIES_IS_LOADING:
      return action.data;

    default:
      return state;
  }
}

export function salariesHasErrored(state = false, action) {
  switch (action.type) {
    case SALARIES_HAS_ERRORED:
      return action.data;

    default:
      return state;
  }
}
