import {
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
import { FieldError } from '@graphql-hooks/generated';
import isEqual from 'lodash/isEqual';
import camelCase from 'lodash/camelCase';
import useToggle from '@common/hooks/useToggle';
import isErrorLike from '@common/utils/isErrorLike';
import createFormErrorHelper from './validation/createFormErrorHelper';

interface Props<TFormValues extends FieldValues> {
  children: ReactNode;
  id: string;
  submitId?: string;
  showErrorSummary?: boolean;
  showSubmitError?: boolean;
  onSubmit: (values: TFormValues) => Promise<void>;
}

/**
 * Form wrapper to integrate with React Hook Form.
 *
 * This provides a bunch of conveniences for displaying errors
 * and linking to them correctly (in error message hrefs) as
 * long as certain conventions are followed.
 *
 * Fields with errors should have ids which share the form's
 * id and camelCased value key in the form
 * e.g. if form id is `firstName`, then a form value with a
 * key of `test` should have a field with an id of
 * `firstName-test`.
 *
 * Additional errors upon submitting the form e.g. from server
 * requests will also be added to the error summary. These
 * will link to the `submitId` prop.
 */

export default function Form<TFormValues extends FieldValues>({
  children,
  id,
  submitId = `${id}-submit`,
  showErrorSummary = true,
  showSubmitError = true,
  onSubmit,
}: Props<TFormValues>) {
  const isMounted = useMountedRef();

  const {
    formState: { errors, submitCount, touchedFields, isSubmitted },
    handleSubmit: submit,
  } = useFormContext();

  const values = useWatch<TFormValues>();
  const previousValues = useRef(values);
  const previousSubmitCount = useRef(submitCount);

  const { getAllErrors, getError, hasError } = createFormErrorHelper({
    errors,
    touchedFields,
    isSubmitted,
  });

  const [hasSummaryFocus, toggleSummaryFocus] = useToggle(false);
  const [submitError, setSubmitError] = useState<FieldError>();

  useEffect(() => {
    if (!isMounted.current) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    if (submitError && !isEqual(values, previousValues.current)) {
      setSubmitError(undefined);
    }

    previousValues.current = values;
  }, [isSubmitted, submitError, submitCount, values, isMounted]);

  const allErrors = useMemo(() => {
    const summaryErrors: FieldError[] = Object.entries(getAllErrors()).map(
      ([field, message]) => ({
        id: `${id}-${camelCase(field)}`,
        field: camelCase(field),
        message: typeof message === 'string' ? message : '',
        code: '',
      }),
    );

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
    async (event: FormEvent) => {
      event.preventDefault();
      toggleSummaryFocus.off();

      await submit(async () => {
        setSubmitError(undefined);
        try {
          await onSubmit(values as TFormValues);
        } catch (e) {
          if (showSubmitError && isErrorLike(e)) {
            // eslint-disable-next-line no-console
            console.error(e);

            if (isMounted.current) {
              setSubmitError({
                field: '',
                message: e.message,
                code: '',
              });
            }
          } else {
            throw e;
          }
        }
      })(event);
    },
    [toggleSummaryFocus, submit, onSubmit, values, showSubmitError, isMounted],
  );


  return (
    
  )
}
