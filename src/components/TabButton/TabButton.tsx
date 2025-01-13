import styles from "./TabButton.module.css";

export default function TabButton({ onSelect, children, isActive }) {
  return (
    <button
      onClick={onSelect}
      className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
    >
      {children}
    </button>
  );
}
