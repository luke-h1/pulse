import {
  FieldValues,
  FormProvider as RHFormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import React, { ReactNode, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import isEqual from 'lodash/isEqual';

interface FormProviderProps<TFormValues extends FieldValues> {
  children: ReactNode | ((form: UseFormReturn<TFormValues>) => ReactNode);
  enableReinitialize?: boolean;
  initialValues?: UseFormProps<TFormValues>['defaultValues'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: z.Schema<any, any>;
}

export default function FormProvider<TFormValues extends FieldValues>({
  children,
  enableReinitialize,
  initialValues,
  validationSchema,
}: FormProviderProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    defaultValues: initialValues,
    mode: 'onBlur',
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    shouldFocusError: false,
  });

  const previousInitialValues = useRef(initialValues);

  /**
   * RHF caches default values and doesn't have a built in option
   * to reinitialise forms.
   * This use effect provides the equivalent functionality as
   * Formik's `enableReinitialize` by checking for changes to the
   * initialValues and reseting the form with the new values if they've changed.
   */

  useEffect(() => {
    if (
      enableReinitialize &&
      !isEqual(previousInitialValues.current, initialValues)
    ) {
      methods.reset(initialValues as TFormValues);
      previousInitialValues.current = initialValues;
    }
  }, [enableReinitialize, methods, initialValues]);

  return (
    <RHFormProvider {...methods}>
      {typeof children === 'function' ? children(methods) : children}
    </RHFormProvider>
  );
}
