import React from "react";

import { useToDoStor } from "../../data/stores/useToDoStor"

import { InputPlus } from "../components/InputPlus"
import { InputTask } from "../components/inputTask"

import styles from "./index.module.scss"

export const App: React.FC =() =>{
  const [
    tasks,
    createTask,
    updateTask,
    removeTask,

  ] = useToDoStor(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])
  return( 
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>ToDoS</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if(title){
              createTask(title)
            }
          }}/>
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask 
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemove={removeTask}
          />
        ))}
      </section>
    </article>
  );
}
