import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss"

interface InputTaskProps{
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps>=({
  id,
  title,
  onDone,
  onEdited,
  onRemove
}) =>{

  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title)
  const editTitleInputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(isEditMode){
      editTitleInputRef?.current?.focus()
    }
  },[isEditMode])

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
        type="checkbox"
        disabled={isEditMode}
        checked={checked}
        className={styles.inputTaskCheckbox}
        onChange={(ent) =>{
          setChecked(ent.target.checked);

          if(ent.target.checked){
            setTimeout(() => {
              onDone(id);
            }, 300);
          }
        }}
        />
        { isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if(evt.key === 'Enter'){
                onEdited(id, value)
                setIsEditMode(false)
              }
            }}
            className={styles.inputTaskEditTitle}
          />
        ):(
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      { isEditMode ? (
      <button
        aria-label="Save"
        className={styles.inputTaskSave}
        onClick={() => {
          onEdited(id, value)
          setIsEditMode(false)
        }}
      />) : (
      <button
        aria-label="Edit"
        className={styles.inputTaskEdit}
        onClick={() => {
          setIsEditMode(true)
        }}
      />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() =>{
          if(confirm('Are you sure')){
            onRemove(id);
          }
        }}
      />
    </div>
  )
}
