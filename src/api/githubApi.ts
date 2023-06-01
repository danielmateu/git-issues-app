import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        // Authorization: 'Bearer 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'
    }
})



