import { useRef } from 'react';
import { Button, Icon, InputGroup } from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { BaseProps } from '@common/components/form/FormControl';
import { useController } from 'react-hook-form';

interface Props extends BaseProps {
  accept?: string;
  multiple?: boolean;
}

const ImageInput = (props: Props) => {
  const { name, control, accept, multiple = false } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef?.current?.click();

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <InputGroup onClick={handleClick}>
      <input
        {...field}
        id={name}
        type="file"
        disabled={isSubmitting}
        multiple={multiple}
        hidden
        accept={accept}
        // {/* {...rest} */}
        ref={e => {
          inputRef.current = e;
        }}
      />
      <Button leftIcon={<Icon as={FiFile} />}>Upload Image</Button>
    </InputGroup>
  );
};
export default ImageInput;
