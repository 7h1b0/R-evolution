import { h, Component } from 'preact';

const sort = (a, b) => {
  const res = b.value - a.value;
  if (res === 0) {
    return a.label.localeCompare(b.label);
  }
  return res;
};

export default ({ metrics, highlight = '' }) => {
  const max = metrics.reduce(
    (acc, { value }) => (value > acc ? value : acc),
    0,
  );
  return (
    <div>
      {metrics
        .sort(sort)
        .map(({ label, value = 0, formatedValue, userId }, index) => {
          const width = isNaN(value) ? 0 : value * 100 / max;
          const background = userId === highlight ? 'red' : '';
          return (
            <div class="progress" key={index}>
              <div
                class="progress-bar"
                style={{ width: `${width}%`, background: `${background}` }}
              />
              <div class="label">
                <p>{`${index + 1} - ${label}`}</p>
                <p>{formatedValue}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
