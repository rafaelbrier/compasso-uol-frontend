import axios from "axios";
import ENDPOINTS_GIT from "./endpoints-git";

const api = axios.create({
    baseURL: ENDPOINTS_GIT.BASE_URL,
});

export default api;
