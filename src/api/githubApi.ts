import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



