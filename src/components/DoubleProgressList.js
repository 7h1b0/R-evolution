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
    (acc, { value, secondValue }) => {
      const maxLocal = value > secondValue ? value : secondValue;
      return maxLocal > acc ? maxLocal : acc;
    },
    0,
  );
  return (
    <div>
      {metrics
        .sort(sort)
        .map(({ label, value, formatedValue, secondValue, formatedSecondValue }, index) => {
          const widthValue = value * 100 / max;
          const widthSecondValue = secondValue * 100 / max;

          return (
            <div class="progress" key={index}>
              <div
                class="progress-bar"
                style={{ width: `${widthValue}%` }}
              />
              <div
                class="progress-bar-second"
                style={{ width: `${widthSecondValue}%` }}
              />
              <div class="label">
                <p>{`${index + 1} - ${label}`}</p>
                <p>{formatedValue}</p>
              </div>
              <div class="label">
                <p></p>
                <p>{formatedSecondValue}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
