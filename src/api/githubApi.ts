import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



