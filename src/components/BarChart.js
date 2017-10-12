import { h, Component } from 'preact';
import withDimension from './withDimension';

class BarChart extends Component {
  state = { width: 0 };
  startX = 40;
  startY = 40;
  endY = 40;

  componentDidMount() {
    if (this.svg === null) {
      this.setState({ width: 42 });
      return;
    }

    this.updateDimensionsImmediate();
  }

  componentWillReceiveProps() {
    this.updateDimensionsImmediate();
  }

  updateDimensionsImmediate() {
    this.setState({ width: this.svg.offsetWidth });
  }

  getMax(datasets) {
    return datasets.reduce((max, { data }) => {
      const maxData = data.reduce(
        (maxLocal, value) => (maxLocal > value ? maxLocal : value),
        0,
      );
      return maxData > max ? maxData : max;
    }, 0);
  }

  getY(value, max, height) {
    return (max - value) * height / max + this.startY;
  }

  renderData(deltaX, height, max) {
    const { scaleX = 100, datasets } = this.props;
    const sizeWithGutter = deltaX * scaleX / 100;
    const margin = (deltaX - sizeWithGutter) / 2;
    const widthRect =
      deltaX === 0 ? 0 : (deltaX - margin * 2) / datasets.length;

    return datasets.map(({ data, color }, indexDataset) => {
      return data.map((value, indexData) => {
        const valueNormalized = value > 0 ? value : 0;
        const x =
          indexData * deltaX + margin + widthRect * indexDataset + this.startX;
        const heightRect = height * valueNormalized / max;
        const y = this.getY(valueNormalized, max, height); //(max - valueNormalized) * height / max + startY;
        return (
          <rect
            key={indexDataset * 1000 + indexData}
            y={y || 0}
            x={x}
            width={widthRect}
            height={heightRect || 0}
            fill={color}
          />
        );
      });
    });
  }

  renderLegendsX(deltaX, height) {
    const { labels } = this.props;
    const y = height - 20;
    return labels.map((label, index) => {
      const x = deltaX * index + deltaX / 2 + this.startX;
      return (
        <text
          x={x}
          y={y}
          stroke="none"
          text-anchor="middle"
          key={`legendX${i}`}
        >
          {label}
        </text>
      );
    });
  }

  renderLegendsY(max, width, height) {
    let scale = Math.ceil(30 * max / height);
    scale = scale === 0 ? 1 : scale;

    const legendsY = [];
    for (let i = 0; i < max + scale; i += scale) {
      legendsY.push(i);
    }

    return legendsY.map((legendY, i) => {
      const y = this.getY(legendY, max, height) + 0.5;
      return (
        <g key={`legendY${i}`}>
          <text x={this.startX - 8} y={y + 4} text-anchor="end" stroke="none">
            {legendY}
          </text>
          <line
            stroke-width="1px"
            x1={this.startX}
            x2={width}
            y1={y}
            y2={y}
            stroke={'rgba(0, 0, 0, 0.2)'}
          />
        </g>
      );
    });
  }

  renderLabels() {
    const { datasets } = this.props;
    const { width } = this.state;

    const sizeLegend = 150;
    const heightLegend = 10;

    const marginLeft = (width - datasets.length * sizeLegend) / 2;

    return datasets.map(({ color, label }, index) => {
      const x = marginLeft + index * sizeLegend;

      return (
        <g key={label}>
          <rect y={0} x={x} width={40} height={heightLegend} fill={color} />
          <text x={x + 50} y={heightLegend} text-anchor="start" stroke="none">
            {label}
          </text>
        </g>
      );
    });
  }

  render({ labels, legendsX, datasets, height = 300 }, { width }) {
    const widthNormalized = width === 0 ? 0 : width - this.startX;
    const heightNormalized = height - this.startY - this.endY;
    const max = this.getMax(datasets);
    const deltaX =
      datasets[0].data.length === 0
        ? 0
        : widthNormalized / datasets[0].data.length;

    return (
      <div ref={c => (this.svg = c)} className="chart-container">
        <svg style={{ width: `${width}px`, height: `${height}px` }}>
          <g stroke="rgba(255, 255, 255, 0.5)">
            {this.renderLegendsY(max, widthNormalized, heightNormalized)}
            {legendsX && this.renderLegendsX(deltaX, height)}
            {labels && this.renderLabels()}
            {this.renderData(deltaX, heightNormalized, max)}
          </g>
        </svg>
      </div>
    );
  }
}

export default withDimension(BarChart);
