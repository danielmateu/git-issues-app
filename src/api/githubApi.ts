import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



