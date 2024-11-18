export default function Todo({ text, isDone }) {
  return (
    <div className="todo">
      <span className="todo-text">{text}</span>
      <input type="checkbox" checked={isDone} disabled/>
    </div>
  )
}