import {
  Input as ChakraInput,
  InputProps,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useController } from 'react-hook-form';
import FormControl, { BaseProps } from './FormControl';

export interface InputControlProps extends BaseProps {
  /**
   * Chakra InputProps
   */
  inputProps?: InputProps;

  /**
   * The Chakra InputLeftAddon
   * https://chakra-ui.com/docs/components/input#left-and-right-addons
   */
  leftAddon?: ReactNode;

  /**
   * The Chakra InputRightAddon
   * https://chakra-ui.com/docs/components/input#left-and-right-addons
   */
  rightAddon?: ReactNode;

  /**
   * The Chakra InputLeftElement
   * https://chakra-ui.com/docs/components/input#add-elements-inside-input
   */
  leftElement?: ReactNode;

  /**
   * The Chakra InputRightElement
   * https://chakra-ui.com/docs/components/input#add-elements-inside-input
   */
  rightElement?: ReactNode;

  /**
   * type of input
   * @default text (if not specified)
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
   * for more information
   */
  type?: HTMLInputElement['type'];
}

const Input = (props: InputControlProps) => {
  const {
    name,
    control,
    label,
    type,
    inputProps,
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    ...rest
  } = props;

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control} label={label} {...rest}>
      <InputGroup>
        {typeof leftAddon === 'string' ? (
          <InputLeftAddon>{leftAddon}</InputLeftAddon>
        ) : (
          leftAddon
        )}
        {typeof leftElement === 'string' ? (
          <InputLeftElement>{leftElement}</InputLeftElement>
        ) : (
          leftElement
        )}
        <ChakraInput
          {...field}
          id={name}
          isDisabled={isSubmitting}
          type={type}
          {...inputProps}
        />
        {typeof rightElement === 'string' ? (
          <InputRightElement>{rightElement}</InputRightElement>
        ) : (
          rightElement
        )}
        {typeof rightAddon === 'string' ? (
          <InputRightAddon>{rightAddon}</InputRightAddon>
        ) : (
          rightAddon
        )}
      </InputGroup>{' '}
    </FormControl>
  );
};
export default Input;
