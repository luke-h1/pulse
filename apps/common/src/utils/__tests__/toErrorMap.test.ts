import toErrorMap from '../toErrorMap';

const mockSetError = jest.fn();

jest.mock('react-hook-form', () => ({
  useFormSetError: mockSetError,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('toErrorMap', () => {
  test('should return true and call mockSetError with required values', () => {
    const errors = [
      {
        field: 'email',
        message: 'email is required',
      },
      {
        field: 'password',
        message: 'password is required',
      },
    ];

    const result = toErrorMap(mockSetError, errors);

    expect(result).toBeTruthy();
    expect(mockSetError).toHaveBeenCalledTimes(2);

    expect(mockSetError).toHaveBeenNthCalledWith(1, 'email', {
      type: 'manual',
      message: 'email is required',
    });

    expect(mockSetError).toHaveBeenNthCalledWith(2, 'password', {
      type: 'manual',
      message: 'password is required',
    });
  });

  test('should return false when errors array is empty or null', () => {
    let result = toErrorMap(mockSetError, []);

    expect(result).toBeFalsy();
    expect(mockSetError).not.toHaveBeenCalled();

    result = toErrorMap(mockSetError, null);
    expect(result).toBeFalsy();
    expect(mockSetError).not.toHaveBeenCalled();
  });
});
