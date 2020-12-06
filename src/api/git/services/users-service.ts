import apiGit from "api/git/api-git";
import ENDPOINTS_GIT from "api/git/endpoints-git";

export function getUser(nome?: string) {
    return apiGit.get(ENDPOINTS_GIT.USER(nome));
}
export function getUserRepos(nome?: string) {
    return apiGit.get(ENDPOINTS_GIT.USER_REPO(nome));
}
export function getUserStarred(nome?: string) {
    return apiGit.get(ENDPOINTS_GIT.USER_STARRED(nome));
}
