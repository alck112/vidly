import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/movies";

export function getMovies() {
    return http.get(apiEndpoint);

}

export function deleteMovie(id) {
    http.delete(apiEndpoint + "/"+ id);
}