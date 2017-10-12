import {
  TOKEN,
  LOGIN_HAS_ERRORED,
  LOGIN_IS_SUBMITTING,
  LOGIN_SUBMIT_SUCCESS,
} from './../constants/actionTypes';

export function loginIsSubmitting(state = false, action) {
  switch (action.type) {
    case LOGIN_IS_SUBMITTING:
      return action.data;

    default:
      return state;
  }
}

export function loginSucceeded(state = false, action) {
  switch (action.type) {
    case LOGIN_SUBMIT_SUCCESS:
      return action.data;

    default:
      return state;
  }
}

export function loginHasErrored(state = false, action) {
  switch (action.type) {
    case LOGIN_HAS_ERRORED:
      return action.data;

    default:
      return state;
  }
}

export function token(
  state = 'FDBtqt1+aQ+mwcDO99nshGWJfGxZtJ+eNbt1SDXw2IvNhF2KbfK70L8e/fpQScMCnCt7NdepTs4bjsR1ssdghw==',
  action,
) {
  switch (action.type) {
    case TOKEN:
      return action.data;

    default:
      return state;
  }
}
