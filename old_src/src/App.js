import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import Customers from './components/common/customers'
import Rentals from "./components/common/rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/common/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/RegisterForm";
import { ToastContainer} from 'react-toastify';
import http from "./services/httpService";
import 'react-toastify/dist/ReactToastify.css';
import * as Sentry from "@sentry/react";
import './App.css';



class App extends Component {

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar />
                <main className="container">
                    <div>
                        <Switch>
                            <Route path="/movies/:id" component={MovieForm} />
                            <Route path="/movies/new" component={MovieForm} />
                            <Route path="/movies" component={Movies} />
                            <Route path="/customers" component={Customers} />
                            <Route path="/rentals" component={Rentals} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            <Route path="/not-found" component={NotFound} />
                            <Redirect from="/" to="/movies" exact />
                            <Redirect to="/not-found" />
                        </Switch>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Sentry.withProfiler(App);
