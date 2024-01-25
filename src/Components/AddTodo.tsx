import styles from './AddTodo.module.css'

export default function AddTodo(props: {addItem: any, todoText: string, inputText: any}) {

  return (
    <div className={styles.addTodo}>
      <div className={styles.addCircle} onClick={props.addItem} ></div>
      <input placeholder='Create a new todo…' 
        className={styles.input} type="text" onChange={props.inputText} value={props.todoText} />
    </div>
  )
}
