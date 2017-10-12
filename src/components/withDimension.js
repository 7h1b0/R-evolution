import { h, Component } from 'preact';
import _debounce from 'debounce';

export default ComposedComponent =>
  class withResponsive extends Component {
    constructor(props) {
      super(props);
      this.maxSize = 600;
      this.state = { width: 0 };

      this.updateDimensionsImmediate = this.updateDimensionsImmediate.bind(
        this,
      );
      this.updateDimensions = _debounce(this.updateDimensionsImmediate, 300);
    }

    componentDidMount() {
      this.updateDimensionsImmediate();
      window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
      this.updateDimensions.clear();
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensionsImmediate() {
      this.setState({ width: window.innerWidth });
    }

    render() {
      return <ComposedComponent width={this.state.width} {...this.props} />;
    }
  };
