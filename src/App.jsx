import { useCallback, useEffect, useMemo, useState } from "react";
import AddTodo from "./components/AddTodo";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./services/firebase.config";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState(null);

  const collectionRef = useMemo(() => collection(db, "todos"), []);

  const getTodos = useCallback(() => getDocs(collectionRef)
    .then(snapshot => {
      setTodos(snapshot.docs.map(docSnapshot => docSnapshot.data()))
    }), [collectionRef])

  useEffect(() => {
    getTodos();
  }, [collectionRef, getTodos])

  console.log(todos);

  return (
    <div className="app">
      <AddTodo getTodos={getTodos} />
      {todos && todos.map((todo, index) => <Todo key={index} text={todo.todo} isDone={todo.isDone} />)}
    </div>
  )
}

export default App
