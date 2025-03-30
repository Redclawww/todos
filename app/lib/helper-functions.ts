import { JSON_SOURCE_FILE } from "../_dal/constants";
import fs from "fs";

export function getTodosFromFile() {
    const file = fs.readFileSync(process.cwd() + JSON_SOURCE_FILE, "utf8");

    if(!file) {
        console.log("Error: No file found");
        fs.writeFileSync(process.cwd() + JSON_SOURCE_FILE, JSON.stringify({ todos: [] }), "utf8");
        return { todos: [] };
    }

    let data = JSON.parse(file);
    return data.todos
}


export function writeTodosToFile(todos: any) {
    if(!todos) {
        console.log("Error: No todos found");
        return false;
    }
    fs.writeFileSync(
        process.cwd() + JSON_SOURCE_FILE,
        JSON.stringify({
            todos: todos,
        }),
        "utf8"
    );   
}