import {
  PROJECTS,
  PROJECTS_IS_LOADING,
  PROJECTS_HAS_ERRORED,
} from './../constants/actionTypes';

export function projectIsLoading(state = false, action) {
  switch (action.type) {
    case PROJECTS_IS_LOADING:
      return action.data;

    default:
      return state;
  }
}

export function projects(state = [], action) {
  switch (action.type) {
    case PROJECTS:
      return action.data;

    default:
      return state;
  }
}

export function projectsHasErrored(state = false, action) {
  switch (action.type) {
    case PROJECTS_HAS_ERRORED:
      return action.data;

    default:
      return state;
  }
}
