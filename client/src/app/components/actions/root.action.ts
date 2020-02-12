export const fetchTodosPending = () => {
    return {
        type: 'FETCH_TODOS_PENDING'
    }
}

export const fetchTodosSuccess = (todos: []) => {
    return {
        type: 'FETCH_TODOS_SUCCESS',
        todos: todos
    }
}

export const fetchTodosError = (error: undefined) => {
    return {
        type: 'FETCH_TODOS_ERROR',
        error: error
    }
}
