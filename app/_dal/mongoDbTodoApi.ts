import { revalidatePath } from "next/cache";
import { JSON_SOURCE_FILE } from "./constants";
import { promises as fs } from "fs";
import dbConnect from "../lib/mongoDb";
import TodoModel from "../lib/models/todo.model";


export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export interface ITodoApi {
  getTodos(): Promise<Array<Todo>>;
  addTodo(text: string): Promise<Todo>;
  deleteTodo(id: number): Promise<{
    id: number;
  }>;
  markTodoComplete(id: number): Promise<Todo>;
}

export class MongoDbTodoApi implements ITodoApi {
  async getTodos(): Promise<Array<Todo>> {
    await dbConnect();
    try {
      const todos = await TodoModel.find({}).lean();
      return todos;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch todos from MongoDB");
    }
  }

  async addTodo(text: string): Promise<Todo> {
    await dbConnect();
    try {
      const randomId = Math.floor(Math.random() * 2121212);
      console.log(text);
      
      const newTodoItem: Todo = {
        id: randomId,
        text: text,
        completed: false,
      };
      const todo = new TodoModel(newTodoItem);
      await todo.save();
      return newTodoItem;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add todo to MongoDB");
    }
  }

  async deleteTodo(id: number): Promise<{ id: number }> {
    await dbConnect();
    try {
      const deletedTodo = await TodoModel.findOneAndDelete({ id: id });
      if (!deletedTodo) {
        throw new Error("Todo not found");
      }
      return { id: deletedTodo.id };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete todo from MongoDB");
    }
  }

  async markTodoComplete(id: number): Promise<Todo> {
    await dbConnect();
    try {
      const todo = await TodoModel.findOne({ id: id });
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.completed = !todo.completed;
      await todo.save();
      return todo;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to mark todo as complete in MongoDB");
    }
  }
}
