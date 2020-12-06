interface RepoResponse {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    language: string;
    forks: number;
    watchers_count: number;
    stargazers_count: number;
    open_issues: number;
}

export default RepoResponse;
