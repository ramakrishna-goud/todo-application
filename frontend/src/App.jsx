import { useEffect, useState } from "react";

const API = "http://localhost:8000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const load = () => fetch(`${API}/todos`).then(r => r.json()).then(setTodos);
  useEffect(() => { load(); }, []);

  async function add() {
    if (!title.trim()) return;
    await fetch(`${API}/todos`, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title, completed:false})
    });
    setTitle(""); load();
  }

  async function toggle(t) {
    await fetch(`${API}/todos/${t.id}`, {
      method: "PUT", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title:t.title, completed:!t.completed})
    });
    load();
  }

  async function remove(id) {
    await fetch(`${API}/todos/${id}`, {method:"DELETE"});
    load();
  }

  return <div className="app">
    <h1>Todo Manager</h1>
    <div className="row">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter a task"/>
      <button onClick={add}>Add</button>
    </div>
    {todos.map(t => <div className="card" key={t.id}>
      <span onClick={()=>toggle(t)} className={t.completed ? "done" : ""}>{t.title}</span>
      <button onClick={()=>remove(t.id)}>Delete</button>
    </div>)}
  </div>;
}
