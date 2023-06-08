import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})



