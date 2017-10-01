import { h, Component } from 'preact';

export default class BarChart extends Component {
  renderMetic(
    metrics,
    width,
    height,
    max,
    min = 0,
    marginLegend = 30,
    gutter = 6,
  ) {
    const widthBar = (width - marginLegend) / metrics.length;
    const maxNormalized = max - min;

    return metrics.map((metric, index) => {
      const metricNormalized = metric - min;
      const y = (maxNormalized - metricNormalized) * height / maxNormalized;
      const x = widthBar * index + marginLegend + gutter;
      return (
        <rect
          y={y}
          x={x}
          width={widthBar - gutter}
          height={metricNormalized * height / maxNormalized}
        />
      );
    });
  }

  render({ width, height, metrics, legends, highlight }) {
    const size = legends.length;
    const distanceBetweenLines = height / (size - 1);
    const max = legends[0];
    const min = legends[size - 1];

    return (
      <div class="chart-container">
        <svg>
          <g stroke="rgba(255, 255, 255, 0.5)">
            {legends.map((legend, i) => {
              if (i === 0) return '';

              const y = i * distanceBetweenLines - 0.5;
              return (
                <g key={i}>
                  <text x={5} y={y - 10} stroke="none">
                    {legend}
                  </text>
                  <line
                    stroke-width="1px"
                    stroke-dasharray="2px"
                    x1={0}
                    x2={width}
                    y1={y}
                    y2={y}
                    stroke={highlight === legend && 'red'}
                  />
                </g>
              );
            })}
          </g>
          {this.renderMetic(metrics, width, height, max, min)}
        </svg>
      </div>
    );
  }
}
