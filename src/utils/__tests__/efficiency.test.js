import efficiency from '../efficiency';

describe('efficiency', () => {
  it('should exist', () => {
    expect(typeof efficiency).toEqual('function');
  });

  it('should return valid string #1', () => {
    const result = efficiency();

    expect(result).toEqual('0%');
  });

  it('should return valid string #2', () => {
    const result = efficiency('test');

    expect(result).toEqual('0%');
  });

  it('should return valid string #3', () => {
    const result = efficiency(8, 8);

    expect(result).toEqual('100%');
  });

  it('should return valid string #4', () => {
    const result = efficiency(6, 6);

    expect(result).toEqual('100%');
  });

  it('should return valid string #5', () => {
    const result = efficiency(8);

    expect(result).toEqual('100%');
  });

  it('should return valid string #6', () => {
    const result = efficiency(12);

    expect(result).toEqual('150%');
  });
});
