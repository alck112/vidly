import React, {Component} from 'react';
import {getMovies, deleteMovie} from "../services/movieService";
import Pagination from "./common/pagination";
import {pagination} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import  {getGenres} from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import {Link} from 'react-router-dom'
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'},
        searchQuery: ""
    };

    async componentDidMount() {
        const {data: movies} = await getMovies();
        const {data} = await getGenres()
        const genres = [{_id: "", name: 'All Genres'}, ...data];
        this.setState({movies: movies, genres:genres})
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies: movies});

        try {
            await deleteMovie(movie._id)
        }
        catch (ex) {
            console.log(ex.response)
            console.log(ex.response.status)
            if (ex.response && ex.response.status === 404)
                toast.error("The movie has already been deleted.");
            this.setState({movies: originalMovies});
        }
    };

    handleLikedMovie = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].isLiked = !movies[index].isLiked
        this.setState({movies: movies});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = (genre) => {
        console.log(genre);
        this.setState({selectedGenre: genre, currentPage: 1, searchQuery: ""});
    };

    handleSort = (sortColumn) => {
        this.setState({sortColumn: sortColumn});
    };

    handleSearch = (query) => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    getPageData = () => {
        const {
            pageSize,
            currentPage,
            movies: allMovies,
            selectedGenre,
            sortColumn,
            searchQuery
        } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ?
        //     allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        //
        // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        //
        // const movies = pagination(sorted, currentPage, pageSize);

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = pagination(sorted, currentPage, pageSize);

        return {totoalCount: filtered.length, data:movies};
}

    render() {
        const {
            pageSize,
            currentPage,
            genres,
            selectedGenre,
            sortColumn
        } = this.state;

        const {length: count} = this.state.movies;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const {totoalCount, data: movies} = this.getPageData();

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup items={genres}
                               selectedItems={selectedGenre}
                               onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to={"/movies/new"}
                          className="btn btn-primary"
                          style={{marginBottom: 20}}
                    >
                        New Movie
                    </Link>
                    <p> Showing {totoalCount} movies in the database.</p>
                    <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
                    <MoviesTable movies={movies}
                                 onLikeClick={this.handleLikedMovie}
                                 onDelete={this.handleDelete}
                                 onSort={this.handleSort}
                                 sortColumn={sortColumn}
                    />
                    <Pagination itemCount={totoalCount}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                    />

                </div>
            </div>
        );
    };
};

export default Movies;
