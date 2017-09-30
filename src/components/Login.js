import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { login } from '../actions/login';
import Input from './Input';
import { history } from './Router';
import Loading from './Loading';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentWillUpdate({ succeeded, token }) {
    if (succeeded && token !== '') {
      history.push('/dashboard/overview');
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render({ isLoading, hasErrored }, { email, password }) {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <form class="login" onSubmit={this.handleSubmit}>
        <div class="form-container">
          <Input
            title="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            autofocus
          />

          <Input
            title="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <button type="submit">Login</button>
        </div>
        {hasErrored && <p class="error">ERROR</p>}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loginIsSubmitting,
  hasErrored: state.loginHasErrored,
  succeeded: state.loginSucceeded,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
