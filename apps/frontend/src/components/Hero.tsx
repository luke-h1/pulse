import {
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <Stack
      as="section"
      alignItems="center"
      direction={{ base: 'column-reverse', md: 'row' }}
      w="full"
      spacing={12}
    >
      <VStack alignItems="flex-start" w="full" spacing={3}>
        <Stack
          alignItems="center"
          justifyContent={{ base: 'center', md: 'flex-start' }}
          direction={{ base: 'column', md: 'row' }}
          w="full"
          spacing={3}
        >
          <Heading as="h1" size="lg">
            Welcome to Pulse
          </Heading>
        </Stack>
        <Text as="h2" lineHeight="175%">
          Pulse is a platform for developers to share their knowledge and
          connect with other developers.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
          <Button
            as={Link}
            justifyContent={{ base: 'flex-start', md: 'center' }}
            px={4}
            href="https://github.com/luke-h1/pulse"
            rightIcon={<Icon as={FiArrowUpRight} />}
            variant="ghost"
          >
            Github
          </Button>
        </Stack>
      </VStack>
    </Stack>
  );
};
export default Hero;
