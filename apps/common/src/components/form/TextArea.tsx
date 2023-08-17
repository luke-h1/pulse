import {
  TextareaProps as ChakraTextAreaProps,
  Text,
  Kbd,
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
        placeholder="Enter content..."
        id={name}
        disabled={isSubmitting}
        {...textareaProps}
      />
      <Text size="sm" color="black.500">
        Use <Kbd>Tab</Kbd> to open the command menu.
      </Text>
    </FormControl>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
