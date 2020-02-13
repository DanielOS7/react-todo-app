import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateTodo from './components/CreateTodo';
import TodoView from "./components/TodoView";
import { MessageView } from './components/MessageView';

const App: React.FC = () => {
    let [recordActions, setRecordAction] = React.useState(true);

    React.useEffect(() => {
        console.log(recordActions)
    }, [recordActions]);

    
    return (
        <div id="app">
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}>
                    <TodoView recordActions={recordActions} />
                </Route>
                <Route path={"/create-todo"}>
                    <CreateTodo  recordActions={recordActions} />
                </Route>
            </Switch>
        </BrowserRouter>
        <MessageView setRecordAction={setRecordAction} />
        
        </div>


    )



};

export default App;
