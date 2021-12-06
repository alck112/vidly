import http from "./httpService";
// using object destructuring
import {apiUrl} from "../config.json";
// or traditional naming to import
// import config from "../config.json";

export function getGenres() {
    return http.get(apiUrl + "/genres");
    // return http.get(config.apiUrl + "/genres");
    // return http.get(`${apiUrl}/genres`);
}