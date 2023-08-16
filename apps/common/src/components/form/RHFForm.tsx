import camelCase from 'lodash/camelCase';
import React, {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import useMountedRef from '@common/hooks/useMountedRef';
import { VStack } from '@chakra-ui/react';
import useToggle from '@common/hooks/useToggle';
import isErrorLike from '@common/utils/isErrorLike';
import createRHFFormErrorHelper from './validation/createRHFFormErrorHelper';
import ErrorSummary from '../ErrorSummary';
import { FormIdContextProvider } from './contexts/FormIdContext';

interface Props<TFormValues extends FieldValues> {
  children: ReactNode;
  id: string;
  submitId?: string;
  showErrorSummary?: boolean;
  onSubmit: (values: TFormValues) => Promise<void>;
  showSubmitError?: boolean;
  width?: string;
}

export interface ErrorSummaryMessage {
  id: string;
  message: string;
}

export default function RHFForm<TFormValues extends FieldValues>({
  children,
  id,
  onSubmit,
  submitId = `${id}-submit`,
  showErrorSummary = true,
  showSubmitError = false,
  width,
}: Props<TFormValues>) {
  const isMounted = useMountedRef();

  const methods = useFormContext<TFormValues>();
  const { handleSubmit: RHFSubmit } = methods;
  const { isSubmitted, submitCount } = methods.formState;
  const values = useWatch<TFormValues>();
  const previousValues = useRef(values);
  const previousSubmitCount = useRef(submitCount);
  const [hasSummaryFocus, toggleSummaryFocus] = useToggle(false);

  const { getAllErrors } = createRHFFormErrorHelper({
    errors: methods.formState.errors,
    touchedFields: methods.formState.touchedFields,
    isSubmitted,
  });

  const [submitError, setSubmitError] = useState<ErrorSummaryMessage>();

  useEffect(() => {
    if (!isMounted.current) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    previousValues.current = values;
  }, [isMounted, values]);

  const allErrors = useMemo(() => {
    const summaryErrors: ErrorSummaryMessage[] = Object.entries(
      getAllErrors(),
    ).map(([errorName, message]) => ({
      id: `${id}-${camelCase(errorName)}`,
      message: typeof message === 'string' ? message : '',
    }));

    return submitError && isSubmitted
      ? [...summaryErrors, submitError]
      : summaryErrors;
  }, [getAllErrors, id, submitError, isSubmitted]);

  useEffect(() => {
    if (
      (isMounted && allErrors.length,
      submitCount !== previousSubmitCount.current)
    ) {
      toggleSummaryFocus.on();
      previousSubmitCount.current = submitCount;
    }
  }, [allErrors, isMounted, submitCount, toggleSummaryFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await RHFSubmit(async () => {
        try {
          await onSubmit(values as TFormValues);
          // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (e) {
          if (showSubmitError && isErrorLike(e) && isMounted.current) {
            setSubmitError({
              id: submitId,
              message: e.message ?? e,
            });
          }

          // eslint-disable-next-line no-console
          console.error(e);
        }
      })(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [RHFSubmit, onSubmit, values, isMounted, toggleSummaryFocus],
  );

  return (
    <FormIdContextProvider id={id}>
      <VStack
        width={width}
        id={id}
        onSubmit={handleSubmit}
        as="form"
        // align="start"
        spacing={5}
      >
        {showErrorSummary && (
          <ErrorSummary
            errors={allErrors}
            onFocus={toggleSummaryFocus.off}
            focusOnError={hasSummaryFocus}
          />
        )}

        {children}
      </VStack>
    </FormIdContextProvider>
  );
}
