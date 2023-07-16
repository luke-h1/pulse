import { usePathname } from 'next/navigation';
import { Twitter, Link } from 'react-feather';
import { toast } from '../Toast';
import { Tooltip } from '../Tooltip/Tooltip';
import * as styles from './SocialShare.css';

export const SocialShare = () => {
  const pathname = usePathname();

  const url = ''; // TODO LH - env vars here

  const handleCopy = () => {
    navigator.clipboard.writeText(`${url}${pathname}`);
    toast({
      content: 'Copied to clipboard!',
    });
  };

  return (
    <div className={styles.root}>
      <Tooltip content="Twitter">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `${url}${pathname}`,
          )}`}
          className={styles.item}
        >
          <Twitter width=".95em" />
        </a>
      </Tooltip>
      <Tooltip content="Copy link">
        <button className={styles.item} onClick={handleCopy} type="button">
          <Link width=".95em" />
        </button>
      </Tooltip>
    </div>
  );
};
