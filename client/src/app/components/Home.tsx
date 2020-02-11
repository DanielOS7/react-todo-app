import * as React from "react";

export interface IHomeProps { 
    firstName: string, 
    lastName: string
}

export const Home: React.FC<IHomeProps> = (props)  => {
    return (
        <h1>Hello {props.firstName} {props.lastName}</h1>
    );
};