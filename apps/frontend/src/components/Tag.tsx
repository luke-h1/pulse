import { Button } from '@chakra-ui/react';

interface Props {
  tag: string;
  onClick?: () => void;
  selectedTag: string;
}

const Tag = ({ tag, onClick, selectedTag }: Props) => {
  return (
    <Button
      textTransform="uppercase"
      colorScheme="purple"
      onClick={onClick}
      size="xs"
      variant={selectedTag === tag ? 'solid' : 'ghost'}
    >
      {tag}
    </Button>
  );
};
export default Tag;
