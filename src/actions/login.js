import {
  TOKEN,
  LOGIN_HAS_ERRORED,
  LOGIN_IS_SUBMITTING,
  LOGIN_SUBMIT_SUCCESS,
} from './../constants/actionTypes';

export function loginIsSubmitting(isSubmitting) {
  return {
    type: LOGIN_IS_SUBMITTING,
    data: isSubmitting,
  };
}

export function loginHasErrored(error) {
  return {
    type: LOGIN_HAS_ERRORED,
    data: error,
  };
}

export function loginSucceeded(success) {
  return {
    type: LOGIN_SUBMIT_SUCCESS,
    data: success,
  };
}

export function setToken(token) {
  return {
    type: TOKEN,
    data: token,
  };
}

export function login(email, password) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return dispatch => {
    dispatch(loginIsSubmitting(true));
    fetch(
      'https://tu11rbso5b.execute-api.eu-west-1.amazonaws.com/prod/login',
      options,
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(({ token }) => {
        dispatch(setToken(token));
        dispatch(loginSucceeded(true));
      })
      .catch(() => dispatch(loginHasErrored(true)))
      .then(() => dispatch(loginIsSubmitting(false)));
  };
}
