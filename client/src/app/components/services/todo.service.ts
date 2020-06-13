const API = 'http://localhost:2700/todos';

interface IBody {
    id?: number,
    name?: string,
    description?: string,
    date?: Date
}


/**
 * Creates a HTTP GET request method to the todos API.
 * 
 * @param setTodoState a function to call to pass the response data to. 
 */
export const getTodos = (setTodoState: (...args: any[]) => void) => {
    return fetch(`${API}`)
        .then(response => response.json())
        .then(data => setTodoState(data))
        .catch(error => console.error(error));

}

/**
 * Creates a HTTP request to the todos API.
 * 
 * @param body body of data to send in the request. 
 * 
 * @param method request method type. 
 */
export const todoRequest = (body: IBody, method: string) => {
    return fetch(`${API}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}
