import { revalidatePath } from "next/cache";
import { JSON_SOURCE_FILE } from "./constants";
import { promises as fs } from "fs";
import { getTodosFromFile, writeTodosToFile } from "../lib/helper-functions";
import { ITodoApi } from "./mongoDbTodoApi";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};


export class FileJsonTodoApi implements ITodoApi {
  async getTodos(): Promise<Array<Todo>> {
    let todos = getTodosFromFile();
    return todos;
  }

  async addTodo(text: string): Promise<Todo> {
    let todos = getTodosFromFile();
    const randomId = Math.floor(Math.random() * 2121212);
    const newTodoItem: Todo = {
      id: randomId,
      text: text,
      completed: false,
    };

    todos.push(newTodoItem);
    writeTodosToFile(todos);
    return newTodoItem;
  }

  async deleteTodo(id: number): Promise<{ id: number }> {
    let todos = getTodosFromFile();
    todos = todos.filter(
      (todo: { id: Number | null }) => todo.id !== Number(id)
    );
    writeTodosToFile(todos);
    return { id: id };
  }

  async markTodoComplete(id: number): Promise<Todo> {
    let todos = getTodosFromFile();
    const todoIndex = todos.findIndex(
      (todo: { id: Number | null }) => todo.id === id
    );
    todos[todoIndex].completed = !todos[todoIndex].completed;
    writeTodosToFile(todos);
    return todos[todoIndex];
  }
}

// export async function getTodos() {
//   const file = await fs.readFile(process.cwd() + JSON_SOURCE_FILE, "utf8");
//   let data = JSON.parse(file);
//   return data;
// }

// export async function addTodo(text: string): Promise<Todo> {
//   const file = await fs.readFile(process.cwd() + JSON_SOURCE_FILE, "utf8");
//   let data = JSON.parse(file);
//   const randomId = Math.floor(Math.random() * 2121212);
//   const newTodoItem: Todo = {
//     id: randomId,
//     text: text,
//     completed: false,
//   };

//   data.todos.push(newTodoItem);
//   await fs.writeFile(
//     process.cwd() + JSON_SOURCE_FILE,
//     JSON.stringify(data),
//     "utf8"
//   );
//   return data.todos;
// }
