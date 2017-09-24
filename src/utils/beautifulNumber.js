export default (number, sepator = ' ') => {
  if (!number || number === 0) {
    return '';
  }
  const roundNumber = Math.round(number * 100) / 100;
  return `${roundNumber
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, () => sepator)}€`;
};
