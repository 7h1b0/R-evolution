import { h, Component } from 'preact';
import toRegex from 'path-to-regexp';
import createHistory from 'history/createHashHistory';

function matchURI(path, uri) {
  const keys = [];
  const match = toRegex(path, keys).exec(uri);

  if (!match) return null;

  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined;
  }
  return params;
}

function resolve(routes, uri) {
  for (const route of routes) {
    const params = matchURI(route.path, uri);
    if (params) return route.action(params);
  }
  throw new Error('Not found');
}

export const history = createHistory();

export class Router extends Component {
  state = { component: '' };

  componentDidMount() {
    this.handleHistory(history.location);
    this.unlisten = history.listen(this.handleHistory);
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  handleHistory = ({ pathname }) => {
    const component = resolve(this.props.routes, pathname);
    this.setState({ component });
  };

  render({}, { component }) {
    return component;
  }
}

export class NavLink extends Component {
  componentDidMount() {
    this.handleHistory(history.location);
    this.unlisten = history.listen(this.handleHistory);
  }

  shouldComponentUpdate({ to }, { isActive }) {
    return to !== this.props.to || isActive !== this.state.isActive;
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  handleHistory = ({ pathname }) => {
    if (matchURI(this.props.to, pathname)) {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
  };

  handleClick = e => {
    e.preventDefault();
    history.push(this.props.to);
  };

  render({ to, activeClass, children }, { isActive }) {
    return (
      <a href={to} class={isActive && activeClass} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
