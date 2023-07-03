import * as styles from './Button.css';

type ButtonProps = JSX.IntrinsicElements['button'];

export const Button = (props: ButtonProps) => {
  // eslint-disable-next-line react/button-has-type
  return <button {...props} className={styles.root} />;
};
