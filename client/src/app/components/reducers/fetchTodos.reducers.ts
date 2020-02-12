const initialState = {
    isFetching: false as boolean,
    todos: [] as object[],
    error: undefined as undefined
};

export default function fetchTodosReducer(state = initialState, action: {type: string, todos?: [], error?: undefined }) {
    switch (action.type) {
        case 'FETCH_TODOS_PENDING':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todos: action.todos
            }
        case 'FETCH_TODOS_ERROR':
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
}
