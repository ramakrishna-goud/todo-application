from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Todo API")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

todos = []
next_id = 1

class Todo(BaseModel):
    title: str
    completed: bool = False

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def add_todo(todo: Todo):
    global next_id
    item = {"id": next_id, **todo.model_dump()}
    next_id += 1
    todos.append(item)
    return item

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: Todo):
    for item in todos:
        if item["id"] == todo_id:
            item.update(todo.model_dump())
            return item
    return {"error": "Todo not found"}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    return {"message": "Deleted"}
