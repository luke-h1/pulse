import {
  TextareaProps as ChakraTextAreaProps,
  Text,
  Kbd,
  Textarea,
} from '@chakra-ui/react';
import { Form, useController } from 'react-hook-form';
import { forwardRef } from 'react';
import FormControl, { BaseProps } from './FormControl';

export interface TextAreaProps extends BaseProps {
  /**
   * Chakra TextareaProps
   */
  textareaProps?: ChakraTextAreaProps;
}

// const TextArea = (
//   (props, ref) => {
//     const { name, control, textareaProps, ...rest } = props;

//     const {
//       field,
//       formState: { isSubmitting },
//     } = useController({
//       name,
//       control,
//     });
//     return (
//       <FormControl name={name} control={control} {...rest}>
//         {/* <Textarea
//           {...field}
//           id={name}
//           isDisabled={isSubmitting}
//           {...textareaProps}
//           ref={ref}
//           placeholder="Title"
//         /> */}
//         <TextArea
//           id="editor"
//           {...field}
//           style={{
//             minHeight: '500px',
//           }}
//           placeholder="Enter content..."
//         />
//         <Text size="sm" color="black.500">
//           Use <Kbd>Tab</Kbd> to open the command menu.
//         </Text>
//       </FormControl>
//     );
//   },
// );

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
      <Textarea placeholder="Enter content..." id={name} />
      <Text size="sm" color="black.500">
        Use <Kbd>Tab</Kbd> to open the command menu.
      </Text>
    </FormControl>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
