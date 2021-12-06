import axios from "axios";
import {toast} from "react-toastify";
import logger from "../services/logSerivce"


axios.interceptors.response.use(response => {
        return response;
    },
    error => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedError) {
            // Unexpected Error : Errors that technically should not happen (network down, server down, db down, bug)
            // For Unexpected Error > Log them, display a generic and friendly error message
            logger.log(error)
            toast("An unexpected error occurred.", {
                type: toast.TYPE.ERROR
            });
        }
        return Promise.reject(error);
    });

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};