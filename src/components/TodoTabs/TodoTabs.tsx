import { useState } from "react";
import TabButton from "../TabButton/TabButton.tsx";
import styles from "./TodoTabs.module.css";

export default function TodoTabs({
  setStatus,
  allTodos,
  setActiveTab,
  activeTab,
}) {
  function handleStatusChange(selectedButton) {
    setStatus(selectedButton);
    setActiveTab(selectedButton);
  }

  const countTasks = (status) => {
    if (status === "all") {
      return allTodos.length;
    }
    if (status === "completed") {
      return allTodos.filter((todo) => todo.isDone).length;
    }
    if (status === "inWork") {
      return allTodos.filter((todo) => !todo.isDone).length;
    }
    return 0;
  };

  return (
    <menu className={styles.filterMenu}>
      <TabButton
        isActive={activeTab === "all"}
        onSelect={() => handleStatusChange("all")}
      >
        Все ({countTasks("all")})
      </TabButton>
      <TabButton
        isActive={activeTab === "inWork"}
        onSelect={() => handleStatusChange("inWork")}
      >
        В работе ({countTasks("inWork")})
      </TabButton>
      <TabButton
        isActive={activeTab === "completed"}
        onSelect={() => handleStatusChange("completed")}
      >
        Сделано ({countTasks("completed")})
      </TabButton>
    </menu>
  );
}
