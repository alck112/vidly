import React, {Component} from 'react';
import LikeButton from "./common/likeButton";
import Table from "./common/table";
import {Link} from "react-router-dom";

class MoviesTable extends Component {

    columns = [
        {label: 'Title', path: 'title', content: movie => (
                <Link to={`/movies/${movie._id}`}>
                    {movie.title}
                </Link>)},
        {label: 'Genre', path: 'genre.name'},
        {label: 'Stock', path: 'numberInStock'},
        {label: 'Rate', path: 'dailyRentalRate'},
        {
            key: 'like', content:
                movie => (<LikeButton onLikeClick={() => this.props.onLikeClick(movie)}
                                      movie={movie}
                />)
        },
        {
            key: 'delete', content: movie => (
                <button onClick={() => this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm"
                        type="button">
                    Delete
                </button>
            )
        }
    ];

    render() {
        const {movies, sortColumn, onSort} = this.props;

        return (
            <Table columns={this.columns}
                   sortColumn={sortColumn}
                   onSort={onSort}
                   data={movies}
            />
        );
    }
}


export default MoviesTable;