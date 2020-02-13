import * as React from 'react';
import { ITodos } from './models/todo-model';

interface TodoListProps {
    todos: ITodos[],
    setTodoID: Function,
    deleteTodo: Function,
    showForm: Function
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    return (
        <div>
            <ul>
                {props.todos.map(todos => {
                    return (
                        <div>
                            <li key={todos.id}>{`Name: ${todos.name} Description: ${todos.description}`}
                                <button onClick={() => { props.setTodoID(todos.id); props.showForm(true)}}>Edit</button> 
                                <button onClick={() => {props.deleteTodo(todos.id)}}>Delete</button>
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};