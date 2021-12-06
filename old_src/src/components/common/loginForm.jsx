import React, {Component} from 'react';
import Joi from 'joi-browser';
import Form from "./form";

class LoginForm extends Form {

    state = {
        data: {
            username: "",
            password:"",
        },
        errors: {}
    };

    // componentDidMount() {
    //     this.username.current.focus();
    // }

    //New code style//
    // schema = Joi.object({
    //     username: Joi.string().min(5).required(),
    //     password: Joi.string().required()
    // });

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = () => {
        //Call the server
        console.log("Submitted");
    }


    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>

                    {this.renderInput("username","Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;