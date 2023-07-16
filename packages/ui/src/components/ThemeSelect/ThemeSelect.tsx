/* eslint-disable jsx-a11y/label-has-associated-control */

import { useMounted } from '@common/hooks';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Code } from 'react-feather';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import * as styles from './ThemeSelect.css';

const icons = {
  system: <Monitor width=".9em" />,
  light: <Sun width=".9em" />,
  dark: <Moon width=".9em" />,
} as const;

export const ThemeSelect = () => {
  const { isMounted } = useMounted();
  const { theme, setTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <VisuallyHidden>
        <label htmlFor="themeSelect">Select theme</label>
      </VisuallyHidden>
      <div className={styles.root}>
        <span className={styles.icon}>
          {icons[theme as keyof typeof icons]}
        </span>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          className={styles.select}
          id="themeSelect"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <span className={styles.arrow}>
          <Code width=".9em" style={{ transform: 'rotate(90deg)' }} />
        </span>
      </div>
    </>
  );
};
