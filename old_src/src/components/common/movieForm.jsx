import React from 'react';
import Joi from 'joi-browser';
import Form from "./form";
import {getGenres} from "../../services/fakeGenreService";
import {getMovie} from "../../services/fakeMovieService";
import {saveMovie} from "../../services/fakeMovieService";


class MovieForm extends Form {

    state = {
        data: {
            title: "",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres:[],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Rate")
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({genres: genres});

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;

        console.log(movieId)

        const movie = getMovie(movieId);
        console.log(movie);
        if (!movie) return this.props.history.replace("/not-found");

        this.setState({data: this.mapToViewModel(movie)});
    };

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    doSubmit = () => {
        //Call the server
        console.log("Submitted");
        saveMovie(this.state.data);

        this.props.history.push("/movies");
    };



    render() {
        return (
            <div>
                {/*<h1>Movies Form {match.params.id}</h1>*/}
                {/*<button className="btn btn-primary"*/}
                {/*        onClick={() => history.push("/movies")}>*/}
                {/*    Save*/}
                {/*</button>*/}

                <h1>Movies Form</h1>
                <form on_submit={this.handleSubmit}>
                    {this.renderInput("title","Title")}
                    {this.renderSelect("genreId","Genre", this.state.genres)}
                    {this.renderInput("numberInStock","Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate","Rate")}
                    {this.renderButton("Save")}

                </form>
            </div>
        )
    }

}

export default MovieForm;