export default value => {
  if (isNaN(value)) return '0h';

  const decimal = value % 1;
  const hour = Math.trunc(value);
  const min = Math.round(decimal * 60);

  if (min === 0) {
    return `${hour}h`;
  }
  const minStr = `00${min}`.slice(-2);
  return `${hour}h${minStr}`;
};
