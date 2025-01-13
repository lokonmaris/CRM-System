import styles from "./Error.module.css";

export default function Error({ title, message }) {
  return (
    <div className={styles.errorElement}>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
}
