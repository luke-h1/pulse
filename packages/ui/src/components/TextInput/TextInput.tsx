import * as styles from './TextInput.css';

type TextInputProps = JSX.IntrinsicElements['input'];

export const TextInput = (props: TextInputProps) => {
  return <input {...props} className={styles.root} />;
};
