import '@testing-library/jest-dom/extend-expect';

jest.mock('@adobe/css-tools', () => ({
  parse: jest.fn(() => ({})),
  stringify: jest.fn(() => ''),
  default: {
    parse: jest.fn(() => ({})),
    stringify: jest.fn(() => ''),
  },
}));
