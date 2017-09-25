import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState =
  process.env.NODE_ENV === 'production'
    ? undefined
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();

export default () =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));
