import styles from './Footer.module.css';

export default function Footer({ title, footer }) {
  return (
    <div className={styles.footer}>
      <div>{title}</div>
      <div>{footer}</div>
    </div>
  );
}