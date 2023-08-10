import { cloneElement, ReactElement } from 'react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  triggerButton: ReactElement;
}

const CodeBlockMenu = ({ triggerButton }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const triggerElement = cloneElement(triggerButton, {
    onClick: onOpen,
  });

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="right-start"
      trigger="hover"
      closeOnBlur={false}
      isLazy
    >
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>Are you sure you want to delete this?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default CodeBlockMenu;