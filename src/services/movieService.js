import http from "./httpService";
import {apiUrl} from "../config.json";


const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
    return `${apiEndpoint}/${id}`
}

export function getMovies() {
    return http.get(apiEndpoint);
};

export function getMovie(movieId) {
    return http.get(movieUrl(movieId));;
};

export function saveMovie(movie) {

    if (movie._id) {
        const movieUpdata = {...movie}

        delete movieUpdata._id
        return http.put(movieUrl(movie._id), movieUpdata);
    };

    if (!movie._id) {
        return http.post(apiEndpoint, movie )
    };
};

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
};