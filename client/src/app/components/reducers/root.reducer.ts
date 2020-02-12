import fetchTodosReducer from './fetchTodos.reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    todos: fetchTodosReducer,
})

export default rootReducer;