import { useState } from "react"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../services/firebase.config";


export default function AddTodo({ getTodos }) {
  const [todoText, setTodoText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const collectionRef = collection(db, "todos");

  const handleAddTodo = () => {
    try {
      addDoc(collectionRef, {
        todo: todoText,
        isDone: isDone,
        time: serverTimestamp()
      })
        .then(() => {
          console.log("data has been added")
          getTodos();
        })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="add-todo" style={{ border: "1px solid black", padding: 20 }}>
      <input type="text" placeholder="todo" value={todoText} onChange={(event) => setTodoText(event.target.value)} />
      <input type="checkbox" checked={isDone} onChange={(event) => setIsDone(event.target.checked)} />
      <button onClick={handleAddTodo}>add todo</button>
    </div>
  )
}