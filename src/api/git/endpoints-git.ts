const ENDPOINTS_GIT = {
    BASE_URL: "https://api.github.com",
    USER: (user: string = "") => `/users/${user}`,
    USER_REPO: (user: string = "") => `/users/${user}/repos`,
    USER_STARRED: (user: string = "") => `/users/${user}/starred`,
};

export default ENDPOINTS_GIT;
