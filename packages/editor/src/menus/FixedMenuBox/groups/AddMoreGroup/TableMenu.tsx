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

const TableMenu = ({ triggerButton }: Props) => {
  const { onClose, isOpen, onOpen } = useDisclosure();

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
        <PopoverBody>Create Table</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TableMenu;
