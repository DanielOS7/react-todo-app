import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateTodo from './components/CreateTodo';
import TodoView from "./components/TodoView";
import { MessageView } from './components/MessageView';
import { getMessages } from './components/services/message.service';

const App: React.FC<any> = () => {
    let [recordActions, setRecordAction] = React.useState(true);
    let [messages, setMessages] = React.useState([]);

    // const setMessagesState = (data: []) => {
    //     setMessages(data)
    // }

    React.useEffect(() => {
        getMessages(setMessages)
    }, []);

    return (
        <div id="app">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}>
                        <TodoView recordActions={recordActions} setMessagesState={setMessages} />
                    </Route>
                    <Route path={"/create-todo"}>
                        <CreateTodo recordActions={recordActions} setMessagesState={setMessages} />
                    </Route>
                </Switch>
            </BrowserRouter>
            <MessageView recordActions={recordActions} setRecordAction={setRecordAction} messages={messages} setMessagesState={setMessages} />
        </div>
    );
};

export default App;
