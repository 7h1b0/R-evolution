import {
  PROJECTS,
  PROJECTS_IS_LOADING,
  PROJECTS_HAS_ERRORED,
} from './../constants/actionTypes';
import beautifulNumber from '../utils/beautifulNumber';

export function projectIsLoading(isLoading) {
  return {
    type: PROJECTS_IS_LOADING,
    data: isLoading,
  };
}

export function setProjets(projects) {
  return {
    type: PROJECTS,
    data: projects,
  };
}

export function projectsHasErrored(error) {
  return {
    type: PROJECTS_HAS_ERRORED,
    data: error,
  };
}

export function fetchProjets(token) {
  const headers = { headers: { token } };

  return dispatch => {
    dispatch(projectIsLoading(true));
    fetch(
      'https://tu11rbso5b.execute-api.eu-west-1.amazonaws.com/prod/project',
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
        dispatch(
          setProjets(
            Items.map(Item => ({
              label: Item.name,
              secondValue: Item.realCost,
              formatedSecondValue: `Cost: ${beautifulNumber(Item.realCost)}`,
              value: Item.totalBudget,
              formatedValue: `Budget: ${beautifulNumber(Item.totalBudget)}`,
            })),
          ),
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(projectsHasErrored(true));
      })
      .then(() => dispatch(projectIsLoading(false)));
  };
}
