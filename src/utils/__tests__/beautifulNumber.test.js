import beautifulNumber from '../beautifulNumber';

describe('beautifulNumber', () => {
  it('should exist', () => {
    expect(typeof beautifulNumber).toEqual('function');
  });

  it('should return empty string #1', () => {
    const result = beautifulNumber('test');

    expect(result).toEqual('');
  });

  it('should return empty string #2', () => {
    const result = beautifulNumber();

    expect(result).toEqual('');
  });

  it('should return empty string #3', () => {
    const result = beautifulNumber('');

    expect(result).toEqual('');
  });

  it('should return valid string #1', () => {
    const result = beautifulNumber(1000, ' ');

    expect(result).toEqual('1 000€');
  });

  it('should return valid string #2', () => {
    const result = beautifulNumber(98000, ' ');

    expect(result).toEqual('98 000€');
  });

  it('should return valid string #3', () => {
    const result = beautifulNumber(1500000, ',');

    expect(result).toEqual('1,500,000€');
  });

  it('should return valid string #4', () => {
    const result = beautifulNumber(150000.45, ',');

    expect(result).toEqual('150,000.45€');
  });

  it('should return valid string #5', () => {
    const result = beautifulNumber(150000.459, ',');

    expect(result).toEqual('150,000.46€');
  });
});
