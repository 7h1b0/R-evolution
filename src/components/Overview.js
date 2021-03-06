import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { fetchActivities } from '../actions/activity';
import Card from './Card';
import Category from './Category';
import Loading from './Loading';
import BarChart from './BarChart';
import ProgressList from './ProgressList';
import FormatTime from './FormatTime';

class Overview extends Component {
  componentDidMount() {
    if (this.props.metrics.length === 0) {
      this.props.fetchActivities(this.props.token);
    }
  }

  render({
    isLoading,
    average,
    totalHours,
    totalDays,
    shortestDay,
    longestDay,
    daysOfWeek,
    metrics,
    efficiency,
  }) {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div class="container">
        <h1>
          <FormatTime time={average} efficiency />
        </h1>
        <h3>Average by day</h3>
        <Card title="Daily">
          <BarChart
            height={200}
            scaleX={70}
            datasets={[
              {
                label: 'Daily',
                color: 'red',
                data: metrics,
              },
            ]}
          />
        </Card>
        <div class="grid">
          <Card title="Total">
            <Category title="Total hours" value={totalHours} format />
            <Category title="Total days" value={totalDays} />
          </Card>
          <Card title="By day">
            <Category
              title="Shortest day"
              value={shortestDay}
              format
              efficiency
            />
            <Category
              title="Longuest day"
              value={longestDay}
              format
              efficiency
            />
          </Card>
          <Card title="Week day">
            <ProgressList metrics={daysOfWeek} />
          </Card>
        </div>
        <Card title="Efficiency">
          <BarChart
            height={200}
            scaleX={70}
            datasets={[
              {
                label: 'Daily',
                color: 'red',
                data: efficiency,
              },
            ]}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shortestDay: state.shortestDay,
  longestDay: state.longestDay,
  metrics: state.activities,
  efficiency: state.efficiency,
  totalHours: state.totalHours,
  totalDays: state.totalDays,
  average: state.averageDay,
  daysOfWeek: state.daysOfWeek,
  isLoading: state.activityIsLoading,
  userId: state.userId,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: token => dispatch(fetchActivities(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
