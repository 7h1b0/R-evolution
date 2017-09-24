import {
  SALARIES,
  RATECARD,
  SALARIES_IS_LOADING,
  SALARIES_HAS_ERRORED,
} from './../constants/actionTypes';
import beautifulNumber from '../utils/beautifulNumber';

export function salariesIsLoading(isLoading) {
  return {
    type: SALARIES_IS_LOADING,
    data: isLoading,
  };
}

export function salariesHasErrored(error) {
  return {
    type: SALARIES_HAS_ERRORED,
    data: error,
  };
}

export function setSalaries(salaries) {
  return {
    type: SALARIES,
    data: salaries,
  };
}

export function setRatecard(ratecard) {
  return {
    type: RATECARD,
    data: ratecard,
  };
}

export function fetchSalaries(token) {
  const headers = { headers: { token } };

  return dispatch => {
    dispatch(salariesIsLoading(true));
    fetch(
      'https://tu11rbso5b.execute-api.eu-west-1.amazonaws.com/prod/user',
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
        const salaries = [];
        const ratecard = [];
        const size = Items.length;

        for (let i = 0; i < size; i++) {
          const el = Items[i];
          const label = `${el.lastName} ${el.firstName}`;
          salaries.push({
            userId: el.userId,
            label,
            value: el.salary,
            formatedValue: beautifulNumber(el.salary),
          });
          ratecard.push({
            userId: el.userId,
            label,
            value: el.maxRatecard,
            formatedValue: el.maxRatecard,
          });
        }

        dispatch(setRatecard(ratecard));
        dispatch(setSalaries(salaries));
      })
      .catch(err => {
        console.log(err);
        dispatch(salariesHasErrored(true));
      })
      .then(() => dispatch(salariesIsLoading(false)));
  };
}
