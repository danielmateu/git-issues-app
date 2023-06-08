import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



