import { createContext, useState } from 'react'
import styles from './App.module.css'
import TodoCard from './Components/TodoCard'

export const ThemeContext = createContext<any>(null)

function App() {
  const [theme, setTheme] = useState("dark")

  function changeTheme() {
    setTheme((current) => current === "light" ? "dark" : "light");
    console.log(theme);
  }

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      <main className={styles.main} id={theme === "dark" ? styles.dark : styles.light}>
        <div className={styles.todoCard_wrapper}>
          <TodoCard changeTheme={changeTheme} />
        </div>
        
      </main>
    </ThemeContext.Provider>
  )
}

export default App



