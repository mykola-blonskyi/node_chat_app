const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('Should reject non-string values', () => {
    expect(isRealString({a:1})).toBe(false);
  });

  it('Should reject string with only spaces', () => {
    expect(isRealString('   ')).toBe(false);
  });

  it('Should allow string with non-space characters', () => {
    expect(isRealString('asd ')).toBe(true);
  });
});