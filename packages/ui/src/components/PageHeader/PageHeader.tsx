import Balancer from 'react-wrap-balancer';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import * as styles from './PageHeader.css';

interface PageHeaderProps {
  heading: string;
  description?: string;
}

export const PageHeader = ({ heading, description }: PageHeaderProps) => {
  return (
    <header className={styles.root}>
      <Box maxWidth="md" marginX="auto">
        <Heading as="h1" fontSize="xxxl">
          {heading}
        </Heading>
        {description && (
          <>
            <Spacer height="sm" />
            <Text fontSize="lg" color="foregroundNeutral">
              <Balancer>{description}</Balancer>
            </Text>
          </>
        )}
      </Box>
    </header>
  );
};
