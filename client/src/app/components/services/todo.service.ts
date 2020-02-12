const API = 'http://localhost:2700/todos';

interface IBody {
    id?: number,
    name?: string,
    description?: string,
    date?: Date
}

export class TodoService {

    getTodos() {
        return fetch(`${API}`)
            .then(response => response.json())
    }

    createTodo(body: IBody) {
        return fetch(`${API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        

    }

    updateTodo(body: IBody) {
        return fetch(`${API}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    // window.location.reload();
                } else {
                    alert('Failed to update todo');
                };
            })
            .catch( error => console.error(error));
    }


    deleteTodo(body: IBody) {
        return fetch(`${API}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Todo Deleted');
                    // window.location.reload();
                } else {
                    alert('Failed to update todo');
                };
            })
            .catch( error => console.error(error));
    }

}