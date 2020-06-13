import * as React from 'react';
import { ITodos } from './models/todo-model';
import { ListGroup } from 'react-bootstrap';
import './styles/TodoList.css'

interface TodoListProps {
    todos: ITodos[],
    setTodoDetails: (...args: any[]) => void,
    deleteTodo: (...args: any[]) => void,
    showForm: (...args: any[]) => void
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    let index: number = 1
    return (
        <div style={{ marginBottom: "10px" }}>
            <ListGroup style={{marginLeft: "10vw", marginRight: "10vw"}}>
                {props.todos.map(todos => {
                    return (
                        <ListGroup.Item action variant="light" key={index++}>
                            {<span>
                                <span style={{fontSize: "3vw", marginRight: "10px"}}>{`${todos.name}`}</span>
                                <span>{`Description: ${todos.description}`}</span> 
                            </span>}
                            
                            <span style={{ float: "right" }}>
                                <button
                                    className="list-button btn btn-secondary"
                                    style={{ marginRight: "5px" }}
                                    onClick={() => { props.setTodoDetails(todos.id, todos.name); props.showForm(true) }}>Update</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => { props.deleteTodo(todos.id) }}>Remove</button>
                            </span>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};