import { useContext, useState } from 'react'
import styles from './TodoCard.module.css'
import Logo from '../assets/images/TODO.svg'
import SunIcon from '../assets/images/icon-sun.svg'
import MoonIcon from '../assets/images/icon-moon.svg'
import AddTodo from './AddTodo'
import { ThemeContext } from '../App'
import TodoItem from './TodoItem'

export default function TodoCard(props: { changeTheme: any }) {

  const { theme } = useContext(ThemeContext);

  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const [completeList, setCompleteList] = useState<string[]>([]);
  const [activeList, setActiveList] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');

  function inputText(e: any) {
    setTodoText(e.target.value);
  }

  function addItem() {
    if(todoText != '') {
      setTodoList((current) => [...current, todoText])
    }
    setTodoText('');
  }

  function deleteItem(todo: any, id: any) {
    setTodoList((current) => current.filter((_item, index) => index !== id));
    setCompleteList((current) => current.filter((item) => item !== todo))
  }

  function toggleComplete(todo: string, _id: number) {
    if(!completeList.includes(todo)) {
      setCompleteList(current => [...current, todo])
      return;
    }else {
      setCompleteList((current) => current.filter((item) => item !== todo))
    }
  }
  console.log("completed: ", completeList)


  function clearCompleted() {
    setTodoList((current) => current.filter((item) => !completeList.includes(item)))
    setCompleteList([]);
  }

  function filterList(e: any) {
    if(e.target.innerHTML == "All"){
      setFilter('all');
    }else if(e.target.innerHTML == "Active"){
      setFilter('active');
      // const nonActive = todoList.map((item, index) => )
      setActiveList(todoList.filter((todo) => !completeList.includes(todo)))
    }else {
      setFilter('completed');
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={styles.todoDiv}>
        <header className={styles.header}>
          <img src={Logo} alt="Logo" />
          <img src={theme === 'dark' ? SunIcon : MoonIcon} alt="icon"
            onClick={props.changeTheme} className={styles.themeChanger} />
        </header>
        <AddTodo addItem={addItem} todoText={todoText} inputText={inputText}/>
        <div className={styles.todoList}>
          {
            filter == 'all'
            ? todoList.map((todo, id) => (
              <TodoItem todoText={todo} key={id} deleteItem={() => deleteItem(todo, id)}
              completeItem={() => toggleComplete(todo, id)} textId={completeList.includes(todo) ? styles.textCompleted : ""} 
              circleId={completeList.includes(todo) ? styles.circleCompleted : ""}  completedCheckBool={completeList.includes(todo)}/>
              
            ))
            : filter == 'active' ? activeList.map((todo, id) => (
              <TodoItem todoText={todo} key={id} deleteItem={() => deleteItem(todo, id)}
              completeItem={() => toggleComplete(todo, id)} textId={completeList.includes(todo) ? styles.textCompleted : ""} 
              circleId={completeList.includes(todo) ? styles.circleCompleted : ""}  completedCheckBool={completeList.includes(todo)}/>
              
            ))
            : completeList.map((todo, id) => (
              <TodoItem todoText={todo} key={id} deleteItem={() => deleteItem(todo, id)}
              completeItem={() => toggleComplete(todo, id)} textId={completeList.includes(todo) ? styles.textCompleted : ""} 
              circleId={completeList.includes(todo) ? styles.circleCompleted : ""}  completedCheckBool={completeList.includes(todo)}/>
              
            ))

          }
          <div className={styles.optionsSection}>
            <div className={styles.itemsCount}>
              {filter == 'all' ? todoList.length : filter == 'active' ? activeList.length : completeList.length} items left
            </div>
            <div className={styles.filterSection}>
              <span className={styles.filterOption} id={filter == 'all' ? styles.shown : ''} onClick={filterList} >All</span>
              <span className={styles.filterOption} id={filter == 'active' ? styles.shown : ''} onClick={filterList} >Active</span>
              <span className={styles.filterOption} id={filter == 'completed' ? styles.shown : ''} onClick={filterList} >Completed</span>
            </div>
            <div className={styles.clearItems} onClick={clearCompleted}>
              Clear Completed
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
