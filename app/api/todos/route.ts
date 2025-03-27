import { promises as fs } from "fs";

export async function GET(request: Request) {
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  let data = JSON.parse(file);
  return Response.json({ data });
}

export async function POST(request: Request) {
 

  const data = await request.json();
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  let fileTodos = JSON.parse(file);
  const randomId = Math.floor(Math.random() * 2121212);
  const todos = fileTodos.todos;
  console.log(todos);

  todos.push({
    id: randomId,
    text: data.text,
    completed: false,
  });
  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify({
      todos: todos,
    }),
    "utf8"
  );
  return Response.json({ todos: todos });
}

export async function PATCH(
  request: Request,
) {
    const { id } = await request.json()
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  const fileTodos = JSON.parse(file);
  let todos = fileTodos.todos;
  const todoIndex = todos.findIndex(
    (todo: { id: Number | null }) => todo.id === Number(id)
  );
  todos[todoIndex].completed = !todos[todoIndex].completed;
  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify({
      todos: todos,
    }),
    "utf8"
  );
  return Response.json({ success: true });
}

export async function DELETE(
  request: Request,
) {
  const { id } = await request.json()
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  const fileTodos = JSON.parse(file);
  let todos = fileTodos.todos;
  todos = todos.filter((todo: { id: Number | null }) => todo.id !== Number(id));
  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify({
      todos: todos,
    }),
    "utf8"
  );
  return Response.json({ success: true });
}
