import '@testing-library/jest-dom';
global.ResizeObserver = global.ResizeObserver || jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));
  
  