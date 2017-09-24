import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { fetchProjets } from '../actions/project';
import Card from './Card';
import Loading from './Loading';
import DoubleProgressList from './DoubleProgressList';

class Projects extends Component {
  componentDidMount() {
    if (this.props.projects.length === 0) {
      this.props.fetchProjets(this.props.token);
    }
  }

  render({ isLoading, projects }) {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div class="container">
        <div class="grid">
          <Card title="Projects">
            <DoubleProgressList metrics={projects} />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  isLoading: state.projectIsLoading,
  token: state.token,
  error: state.projectsHasErrored,
});

const mapDispatchToProps = dispatch => ({
  fetchProjets: token => dispatch(fetchProjets(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
