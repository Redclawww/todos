import { JSON_SOURCE_FILE, SEED_NUMBER } from "../_dal/constants";
import fs from "fs";
import { Todo } from "../ctypes";
import { FileHelper } from "./fileHelper";

export function getTodosFromFile() {
    const file = FileHelper.getFile();
    let data = JSON.parse(file);
    return data.todos
}

export function writeTodosToFile(todos: Todo) {
    FileHelper.writeToFile(JSON.stringify({ todos: todos }));  
}

export function CreateTodoObject(text: string) {
    const randomId = Math.floor(Math.random() * SEED_NUMBER);
    const newTodoItem: Todo = {
        id: randomId,
        text: text,
        completed: false,
    };
    return newTodoItem;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));