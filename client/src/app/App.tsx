import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateTodo from './components/CreateTodo';

import TodoView from "./components/TodoView";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path={"/"} component={TodoView} />
            <Route path={"/create-todo"} component={CreateTodo} />
          </BrowserRouter>
    )
};

export default App;
