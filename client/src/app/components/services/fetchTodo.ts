import { fetchTodosPending, fetchTodosSuccess, fetchTodosError } from '../actions/root.action';
import { Dispatch } from 'redux';


function fetchTodos() {
    return (dispatch: Dispatch) => {
        dispatch(fetchTodosPending());
        fetch(`http://localhost:2700/todos`)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                dispatch(fetchTodosSuccess(response));
                console.log(response)
                return response;
            })
            .catch(error => {
                dispatch(fetchTodosError(error));
            })
    }
}

export default fetchTodos;