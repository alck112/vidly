import React from 'react';
import {Redirect, Route} from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.getCurrentUser()) return <Redirect to={{
                    pathname: "/login",
                    //this property will set a property call state to the location property of the component which we redirect//
                    state: {from: props.location}
                }}/>
                return Component ? <Component {...props} /> : render(props);
            }}/>
    );
}

export default ProtectedRoute;