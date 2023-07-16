import { User } from 'apollo-hooks/generated';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { Spacer } from '../Spacer';
import { ThemeSelect } from '../ThemeSelect';
import * as styles from './Contentinfo.css';

interface ContentInfoProps {
  user?: User;
}

export const ContentInfo = ({ user }: ContentInfoProps) => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div>
          <Heading>Navigate</Heading>
          <Spacer height="md" />
          <ul className={styles.links}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          </ul>
        </div>
        <div>
          <Heading>Connect</Heading>
          <Spacer height="md" />
          {user && (
            // TODO LUKE: refactor user model to have Links model
            <ul className={styles.links}>
              {user.twitter && (
                <li>
                  <Link href={user.twitter}>Twitter</Link>
                </li>
              )}
              {user.github && (
                <li>
                  <Link href={user.github}>GitHub</Link>
                </li>
              )}
              {user.website && (
                <li>
                  <Link href={user.website}>Website</Link>
                </li>
              )}
            </ul>
          )}
        </div>
        <div>
          <ThemeSelect />
        </div>
      </div>
    </footer>
  );
};
