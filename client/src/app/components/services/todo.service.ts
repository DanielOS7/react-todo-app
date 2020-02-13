import { getMessages, createMessage } from './message.service';

const API = 'http://localhost:2700/todos';

interface IBody {
    id?: number,
    name?: string,
    description?: string,
    date?: Date
}


export const getTodos = (setTodoState: Function) => {
    return fetch(`${API}`)
        .then(response => response.json())
        .then(data => setTodoState(data))
        .catch(error => console.error(error));

}

export const createTodo = (body: IBody, recordActions: boolean, setRedirect: Function, setMessages: Function ) => {
    return fetch(`${API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Todo Created');
            if (recordActions === true) {
                createMessage({ message: 'Added New Todo' });
                getMessages(setMessages);
            }
            setRedirect();
        } else {
            alert('Failed to create Todo');
        };
    })
    .catch(error => console.error(error));
}

export const updateTodo = (body: IBody, recordActions: boolean, getTodos: Function, setMessages: Function) => {
    return fetch(`${API}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Todo Updated');
            getTodos();
            if (recordActions === true) {
                createMessage({ message: 'Updated Todo' });
                getMessages(setMessages);
            }
        } else {
            alert('Failed to update todo');
        };
    })
    .catch(error => console.error(error));
}

export const deleteTodo = (body: IBody, recordActions: boolean, getTodos: Function, setMessages: Function) => {
    return fetch(`${API}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Todo Deleted');
            getTodos();
            if (recordActions === true) {
                createMessage({ message: 'Deleted Todo' });
                getMessages(setMessages);

            }
        } else {
            alert('Failed to update todo');
        };
    })
    .catch(error => console.error(error));
        
}

