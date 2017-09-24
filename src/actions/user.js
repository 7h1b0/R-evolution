import {
  FIRSTNAME,
  LASTNAME,
  USERID,
  USER_IS_LOADING,
  USER_HAS_ERRORED,
} from './../constants/actionTypes';

export function userIsLoading(isLoading) {
  return {
    type: USER_IS_LOADING,
    data: isLoading,
  };
}

export function setUserId(userId) {
  return {
    type: USERID,
    data: userId,
  };
}

export function setFirstName(firstName) {
  return {
    type: FIRSTNAME,
    data: firstName,
  };
}

export function setLastName(lastName) {
  return {
    type: LASTNAME,
    data: lastName,
  };
}

export function userHasErrored(error) {
  return {
    type: USER_HAS_ERRORED,
    data: error,
  };
}

export function fetchUserInfo(token) {
  const headers = { headers: { token } };

  return dispatch => {
    dispatch(userIsLoading(true));
    fetch(
      'https://tu11rbso5b.execute-api.eu-west-1.amazonaws.com/prod/user/me',
      headers,
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(({ Item }) => {
        dispatch(setFirstName(Item.firstName));
        dispatch(setLastName(Item.lastName));
        dispatch(setUserId(Item.userId));
      })
      .catch(() => dispatch(userHasErrored(true)))
      .then(() => dispatch(userIsLoading(false)));
  };
}
