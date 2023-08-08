import {
  TextareaProps as ChakraTextAreaProps,
  Textarea,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import FormControl, { BaseProps } from './FormControl';

export interface TextAreaProps extends BaseProps {
  /**
   * Chakra TextareaProps
   */
  textareaProps?: ChakraTextAreaProps;
}

const TextArea = (props: TextAreaProps) => {
  const { name, control, textareaProps, ...rest } = props;

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control} {...rest}>
      <Textarea
        {...field}
        id={name}
        isDisabled={isSubmitting}
        {...textareaProps}
      />
    </FormControl>
  );
};
export default TextArea;
