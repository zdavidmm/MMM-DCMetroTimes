let registered;

global.Module = {
  register: jest.fn((name, obj) => { registered = obj; })
};

describe('Line color helpers', () => {
  beforeAll(() => {
    require('../MMM-DCMetroTimes.js');
  });

  test('getLineCodeColor returns correct color', () => {
    expect(registered.getLineCodeColor('RD')).toBe('Red');
    expect(registered.getLineCodeColor('SV')).toBe('Silver');
  });

  test('getLineCircleHTML outputs circle span', () => {
    expect(registered.getLineCircleHTML('BL'))
      .toBe("<span class='line-circle' style='background-color:DeepSkyBlue'></span>");
  });
});
