import { combineReducers } from 'redux';
import {
  loginIsSubmitting,
  loginHasErrored,
  token,
  loginSucceeded,
} from './login';
import {
  activities,
  efficiency,
  shortestDay,
  longestDay,
  totalHours,
  totalDays,
  averageDay,
  daysOfWeek,
  activityHasErrored,
  activityIsLoading,
} from './activity';
import { projectIsLoading, projects, projectsHasErrored } from './project';
import {
  salaries,
  ratecard,
  salariesIsLoading,
  salariesHasErrored,
} from './salary';
import {
  firstName,
  lastName,
  userId,
  userIsLoading,
  userHasErrored,
} from './user';

export default combineReducers({
  loginIsSubmitting,
  loginHasErrored,
  loginSucceeded,
  token,
  activities,
  efficiency,
  shortestDay,
  longestDay,
  totalHours,
  totalDays,
  averageDay,
  daysOfWeek,
  activityHasErrored,
  activityIsLoading,
  projectIsLoading,
  projects,
  projectsHasErrored,
  salaries,
  ratecard,
  salariesIsLoading,
  salariesHasErrored,
  firstName,
  lastName,
  userId,
  userIsLoading,
  userHasErrored,
});
