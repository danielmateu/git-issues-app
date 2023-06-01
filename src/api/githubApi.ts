import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



