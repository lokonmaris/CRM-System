import TabButton from "../TabButton/TabButton.tsx";
import styles from "./TodoTabs.module.css";

export default function TodoTabs({
  setStatus,
  setActiveTab,
  activeTab,
  todoInfo,
}) {
  function handleStatusChange(selectedButton) {
    setStatus(selectedButton);
    setActiveTab(selectedButton);
  }

  return (
    <menu className={styles.filterMenu}>
      <TabButton
        isActive={activeTab === "all"}
        onSelect={() => handleStatusChange("all")}
      >
        Все ({todoInfo.all})
      </TabButton>
      <TabButton
        isActive={activeTab === "inWork"}
        onSelect={() => handleStatusChange("inWork")}
      >
        В работе ({todoInfo.inWork})
      </TabButton>
      <TabButton
        isActive={activeTab === "completed"}
        onSelect={() => handleStatusChange("completed")}
      >
        Сделано ({todoInfo.completed})
      </TabButton>
    </menu>
  );
}
