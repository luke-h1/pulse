import { FieldError } from '@graphql-hooks/generated';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

const toErrorMap = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  errors?: FieldError[] | null,
): boolean => {
  let hasErrors = false;
  if (errors && errors.length && errors.length > 0) {
    errors.forEach(({ field, message }) => {
      setError(field as Path<TFieldValues>, {
        type: 'manual',
        message,
      });
    });
    hasErrors = true;
  }

  return hasErrors;
};

export default toErrorMap;
