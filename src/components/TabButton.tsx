export default function TabButton({ onSelect, children }) {
  return <button onClick={onSelect}>{children}</button>;
}
