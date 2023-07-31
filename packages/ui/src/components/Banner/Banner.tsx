import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as styles from './Banner.css';

const bannerLinks: { id: number; text: string; href: string }[] = [
  {
    id: 1,
    text: 'Home',
    href: '/',
  },
  {
    id: 2,
    text: 'Projects',
    href: '/projects',
  },
  {
    id: 3,
    text: 'Posts',
    href: '/posts',
  },
  {
    id: 4,
    text: 'Feed',
    href: '/feed',
  },
];

const Banner = () => {
  const router = useRouter();
  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.group}>
          {bannerLinks &&
            bannerLinks.map(link => (
              <Link
                href={link.href}
                key={link.id}
                className={styles.anchor}
                aria-current={router.pathname === '/' ? 'page' : undefined}
              >
                {router.pathname === '/' && (
                  <motion.span
                    layoutId="highlight"
                    className={styles.highlight}
                  />
                )}
                {link.text}
              </Link>
            ))}
        </div>
        <div className={styles.group}>
          {/* login / logout links here once have them as props */}
          <Link href="/about" className={styles.anchor}>
            About
          </Link>

          <Link href="/contact" className={styles.anchor}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Banner;
