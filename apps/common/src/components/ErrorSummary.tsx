import { Alert, AlertIcon, Stack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { ErrorSummaryMessage } from './form/RHFForm';

interface Props {
  errors: ErrorSummaryMessage[];
  focusOnError?: boolean;
  onFocus?: () => void;
}

const ErrorSummary = ({ errors, onFocus, focusOnError = false }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusOnError && errors.length > 0 && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      ref.current.focus();

      onFocus?.();
    }
  }, [errors, focusOnError, onFocus]);

  return (
    <Stack spacing={3}>
      {errors &&
        errors.map(error => (
          <Alert status="error" key={error.id}>
            <AlertIcon />
            {error.message}
          </Alert>
        ))}
    </Stack>
  );
};
export default ErrorSummary;
