import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { fetchSalaries } from '../actions/salary';
import Loading from './Loading';
import Card from './Card';
import ProgressList from './ProgressList';

class Salaries extends Component {
  componentDidMount() {
    if (this.props.salary.length === 0) {
      this.props.fetchSalaries(this.props.token);
    }
  }

  render({ salary, ratecard, userId, isLoading }) {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div class="container">
        <div class="grid">
          <Card title="Salary">
            <ProgressList metrics={salary} highlight={userId} />
          </Card>
          <Card title="Rate Card">
            <ProgressList metrics={ratecard} highlight={userId} />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ratecard: state.ratecard,
  salary: state.salaries,
  isLoading: state.salariesIsLoading,
  userId: state.userId,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  fetchSalaries: token => dispatch(fetchSalaries(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Salaries);
