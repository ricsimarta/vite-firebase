import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AddTodo from "./components/AddTodo";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "./services/firebase.config";
import Todo from "./components/Todo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/Auth";
import './App.css';

function App() {
  const [todos, setTodos] = useState(null);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const collectionRef = useMemo(() => collection(db, "todos"), []);

  const getTodos = useCallback(() => getDocs(collectionRef)
    .then(snapshot => {
      setTodos(snapshot.docs.map(docSnapshot => {
        return {
          ...docSnapshot.data(),
          id: docSnapshot.id
        }
      }))
    }), [collectionRef])

  useEffect(() => {
    getTodos();
  }, [collectionRef, getTodos])

  useEffect(() => {
    if (user === null) navigate('/signin')
  }, [user, navigate])

  return (
    <div className="app">
      <h2>hello {user?.email}</h2>
      <AddTodo getTodos={getTodos} />
      {todos && todos.map(todo => <Todo 
        key={todo.id} 
        text={todo.todo} 
        isDone={todo.isDone} 
        id={todo.id}
        getTodos={getTodos}
      />)}
      <button onClick={() => auth.signOut()}>sign out</button>
    </div>
  )
}

export default App
