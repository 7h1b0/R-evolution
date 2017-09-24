import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import App from './components/App';
import Overview from './components/Overview';
import Salaries from './components/Salaries';
import Projects from './components/Projects';
import Login from './components/Login';
import configureStore from './stores/store';
import { Router } from './components/Router.js';

const store = configureStore();
const routes = [
  {
    path: '/dashboard/(overview)?',
    action: () => (
      <App>
        <Overview />
      </App>
    ),
  },
  {
    path: '/dashboard/salaries',
    action: () => (
      <App>
        <Salaries />
      </App>
    ),
  },
  {
    path: '/dashboard/projects',
    action: () => (
      <App>
        <Projects />
      </App>
    ),
  },
  { path: '/', action: () => <Login /> },
];

render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.body,
);
