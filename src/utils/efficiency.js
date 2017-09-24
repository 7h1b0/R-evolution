export default (time, base = 8) => {
  if (isNaN(time)) return '0%';

  const efficiency = time * 100 / base;
  const roundedEfficiency = Math.round(efficiency);
  return `${roundedEfficiency}%`;
};
