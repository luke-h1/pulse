import { Button, ButtonProps } from '@chakra-ui/react';
import { Control, useFormState } from 'react-hook-form';

interface SubmitButtonProps extends ButtonProps {
  /**
   * The control passed down from react-hook-form.
   * Only required if not using FormProvider
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { children, control, ...rest } = props;
  const { isSubmitting } = useFormState({ control });
  return (
    <Button type="submit" isLoading={isSubmitting} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
