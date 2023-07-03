import { Post } from 'apollo-hooks/generated';
import Image from 'next/image';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import * as styles from './ProductCard.css';

interface ProductCardProps {
  post: Post;
}

export const ProductCard = ({ post }: ProductCardProps) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.root}>
      {post.image && (
        <Image
          src={post.image}
          width={800}
          height={800}
          objectFit="cover"
          alt=""
        />
      )}
      <Spacer height="xs" />
      <div className={styles.info}>
        <Text fontFamily="mono" fontSize="sm" color="foregroundNeutral">
          {post.title}&nbsp;
          <span aria-hidden className={styles.labelArrow}>
            ↗
          </span>
        </Text>
        <Heading>{post.title}</Heading>
      </div>
    </Link>
  );
};
