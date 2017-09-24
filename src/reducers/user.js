import {
  FIRSTNAME,
  LASTNAME,
  USERID,
  USER_IS_LOADING,
  USER_HAS_ERRORED,
} from './../constants/actionTypes';

export function firstName(state = '', action) {
  switch (action.type) {
    case FIRSTNAME:
      return action.data;

    default:
      return state;
  }
}

export function lastName(state = '', action) {
  switch (action.type) {
    case LASTNAME:
      return action.data;

    default:
      return state;
  }
}

export function userId(state = '', action) {
  switch (action.type) {
    case USERID:
      return action.data;

    default:
      return state;
  }
}

export function userIsLoading(state = false, action) {
  switch (action.type) {
    case USER_IS_LOADING:
      return action.data;

    default:
      return state;
  }
}

export function userHasErrored(state = false, action) {
  switch (action.type) {
    case USER_HAS_ERRORED:
      return action.data;

    default:
      return state;
  }
}
