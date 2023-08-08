import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  TextProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Control, useController, get } from 'react-hook-form';

/**
 * All of the properties from Chakra's FormControlProps except "label" which
 * we are overriding to accept a ReactNode instead of a simple string
 */
export interface ChakraFormControlProps
  extends Omit<FormControlProps, 'label'> {}

/**
 * Defines Chakra & react-hook-form specific properties for all components
 */
export interface BaseReactHookFormProps {
  /**
   * The name of the input (required)
   */
  name: string;

  /**
   * The control passed down from react-hook-form.
   * Only required if not using FormProvider
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;

  /**
   * The label to be associated with the input
   */
  label?: ReactNode;

  /**
   * Chakra FormLabelProps
   */
  labelProps?: FormLabelProps;

  /**
   * Helper text to show alongside input
   */
  helperText?: ReactNode;

  /**
   * Chakra TextProps associated with the helper text
   */
  helperTextProps?: TextProps;

  /**
   * Chakra FormErrorMessageProps for error message
   */
  errorMessageProps?: FormErrorMessageProps;
}

/**
 * The union of ChakraFormControlProps and BaseReactHookFormProps which defines the base properties
 * for most of react-hook-form-chakra components
 */

export interface BaseProps
  extends ChakraFormControlProps,
    BaseReactHookFormProps {}

const FormControl = (props: BaseProps) => {
  const {
    children,
    name,
    control,
    label,
    labelProps,
    helperText,
    helperTextProps,
    errorMessageProps,
    ...rest
  } = props;

  const {
    formState: { errors },
  } = useController({ name, control });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = get(errors, name, '') as any;
  const hasError = Boolean(error?.message);

  return (
    <ChakraFormControl isInvalid={hasError} {...rest}>
      {label && typeof label === 'string' ? (
        <FormLabel htmlFor={name} {...labelProps}>
          {label}
        </FormLabel>
      ) : (
        label
      )}
      {children}
      <FormErrorMessage {...errorMessageProps}>
        {error.message}
      </FormErrorMessage>
      {helperText && typeof helperText === 'string' ? (
        <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
      ) : (
        helperText
      )}
    </ChakraFormControl>
  );
};
export default FormControl;
