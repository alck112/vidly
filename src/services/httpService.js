import axios from "axios";
import logger from "./logSerivce";
import {toast} from "react-toastify";




axios.interceptors.response.use(response => {
        return response;
    },
    error => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedError) {
            logger.log(error);
            toast.error("An unexpected error occurrred.");
        }

        return Promise.reject(error);
    });

//This function is used to get rid of bi-directional dependencies//
function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};