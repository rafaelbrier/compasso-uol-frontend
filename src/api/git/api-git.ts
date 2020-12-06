import axios from "axios";
import ENDPOINTS_GIT from "./endpoints-git";

const apiGit = axios.create({
    baseURL: ENDPOINTS_GIT.BASE_URL,
});

export default apiGit;
