import * as React from 'react';
import fetchTodos from './services/fetchTodo';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
  } from 'react-redux'
import { bindActionCreators } from 'redux';


type HomeProps = {
    firstName: string,
    lastName: string,
}

export const Home: React.FC<HomeProps> = (props) => {

    const bookSuggestion = useSelector(state => state.todos);
    const dispatch = useDispatch();

    let [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:2700/todos`);
            const responseData = await response.json();
            setTodos(responseData);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Hello {props.firstName} {props.lastName}</h1>
            <button className="btn btn-primary" onClick={() => { console.log(todos) }}>Log Data</button>
        </div>
    );
};