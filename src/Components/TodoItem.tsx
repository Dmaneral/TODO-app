import styles from "./TodoItem.module.css"
import CrossIcon from "../assets/images/icon-cross.svg"
import CheckIcon from "../assets/images/icon-check.svg"

export default function TodoItem(props: {todoText: string, deleteItem: any,
   completeItem: any, textId: any, completedCheckBool: boolean, circleId: any}) {
  return (
    <div className={styles.todoItem} >
      <div className={styles.innerItem}>
        <div className={styles.circle} onClick={props.completeItem} id={props.circleId}>
          {props.completedCheckBool ? (<img src={CheckIcon} alt="checked" />) : null}
        </div>
        <span className={styles.todoText} id={props.textId}>{props.todoText}</span>
      </div>
      <img src={CrossIcon} className={styles.deleteCross} alt="Cross Icon" onClick={props.deleteItem} />
    </div>
  )
}
