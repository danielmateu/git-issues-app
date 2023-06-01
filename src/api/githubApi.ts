import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



