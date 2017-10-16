import format from '../format';

describe('format', () => {
  it('should exist', () => {
    expect(typeof format).toEqual('function');
  });

  it('should return valid string #1', () => {
    const result = format('test');

    expect(result).toEqual('0h');
  });

  it('should return valid string #2', () => {
    const result = format();

    expect(result).toEqual('0h');
  });

  it('should return valid string #3', () => {
    const result = format(0);

    expect(result).toEqual('0h');
  });

  it('should return valid string #4', () => {
    const result = format('');

    expect(result).toEqual('0h');
  });

  it('should return valid string #5', () => {
    const result = format(1);

    expect(result).toEqual('1h');
  });

  it('should return valid string #6', () => {
    const result = format(1.5);

    expect(result).toEqual('1h30');
  });

  it('should return valid string #7', () => {
    const result = format(10.3);

    expect(result).toEqual('10h18');
  });

  it('should return valid string #8', () => {
    const result = format(1.1111111);

    expect(result).toEqual('1h07');
  });
});
