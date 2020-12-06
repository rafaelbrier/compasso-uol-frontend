const ENDPOINTS_GIT = {
    BASE_URL: "https://api.github.com",
    USER: (user: string = "") => `/users/${user}`,
};

export default ENDPOINTS_GIT;
