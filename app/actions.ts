"use server";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";

export async function addTodo(formData: FormData) {
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  let data = JSON.parse(file);
  const text = formData.get("todo");
  const randomId = Math.floor(Math.random() * 2121212);
  data.todos.push({
    id: randomId,
    text: text,
    completed: false,
  });
  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify(data),
    "utf8"
  );
  revalidatePath("/server-file-todo");
}

export async function deleteTodo(formData: FormData) {
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  let data = JSON.parse(file);
  const id = Number(formData.get("id"));
  data.todos = data.todos.filter(
    (todo: { id: Number | null }) => todo.id !== id
  );

  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify(data),
    "utf8"
  );
  revalidatePath("/server-file-todo");
}

export async function MarkTodoComplete(formData: FormData) {
  const file = await fs.readFile(process.cwd() + "/app/todos.json", "utf8");
  let data = JSON.parse(file);
  const id = Number(formData.get("id"));
  const todoIndex = data.todos.findIndex(
    (todo: { id: Number | null }) => todo.id === id
  );

  data.todos[todoIndex].completed = !data.todos[todoIndex].completed;
  await fs.writeFile(
    process.cwd() + "/app/todos.json",
    JSON.stringify(data),
    "utf8"
  );
  revalidatePath("/server-file-todo");
}
