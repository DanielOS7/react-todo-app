import * as React from 'react';

interface ITodos {
    id: number,
    name: string,
    description: string,
    date: string
}

type TodoListProps = {
    todos: ITodos[],
    setTodoID: Function,
    deleteTodo: Function
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    return (
        <div>
            <ul>
                {props.todos.map(todos => {
                    return (
                        <div>
                            <li key={todos.id}>{`Name: ${todos.name} Description: ${todos.description}`}
                                <button onClick={() => { props.setTodoID(todos.id)}}>Edit</button> 
                                <button onClick={() => {props.deleteTodo(todos.id)}}>Delete</button>
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );

    // let [todos, setTodos] = React.useState([]);

    // React.useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:2700/todos`);
    //         const responseData = await response.json();
    //         setTodos(responseData);
    //     }
    //     fetchData();
    // }, []);
};