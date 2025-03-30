import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
    id: number;
    completed: boolean; 
    text: string;
}

const TodoSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    text: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, 
});

let TodoModel: Model<ITodo>;

try {
  TodoModel = mongoose.model<ITodo>('Todo');
} catch {
  TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);
}

export default TodoModel;