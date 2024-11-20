import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../services/firebase.config"

export default function Todo({ text, isDone, id, getTodos }) {
  const documentRef = doc(db, 'todos', id);

  const handleDelete = () => {
    deleteDoc(documentRef)
      .then(() => getTodos())
  }

  const handleUpdate = () => {
    updateDoc(documentRef, {
      isDone: !isDone
    })
      .then(() => getTodos())
      .catch(err => console.log("error: ", err))
  }

  return (
    <div className="todo">
      <span className="todo-text" style={{ textDecoration: isDone ? "line-through " : "unset" }}>{text}</span>
      <input type="checkbox" checked={isDone} onChange={handleUpdate}/>
      <button onClick={handleDelete}>x</button>
    </div>
  )
}