import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Header from './Header';
import Loading from './Loading';
import { fetchUserInfo } from '../actions/user';
import { history } from './Router';

class App extends Component {
  componentDidMount() {
    if (this.props.lastName === '' && this.props.token !== '') {
      this.props.fetchUserInfo(this.props.token);
    }
  }
  render({ isLoading, children, token }) {
    if (token === '') {
      history.push('/');
      return '';
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastName: state.lastName,
  token: state.token,
  isLoading: state.userIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: token => dispatch(fetchUserInfo(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
