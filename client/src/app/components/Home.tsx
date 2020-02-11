import * as React from "react";

type HomeProps = {
    firstName: string,
    lastName: string,
}

export const Home: React.FC<HomeProps> = (props) => {

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