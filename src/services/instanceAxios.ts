import axios from 'axios'

export const handleApiError = (error: unknown): string => {
    let errorMessage = 'Unexpected Error'

    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.error('API Error:', error.response.data)
            errorMessage = error.response.data?.message ?? error.response.statusText
        } else if (error.request) {
            console.error('No response Error:', error.request)
            errorMessage = 'No response from server'
        }
    } else if (error instanceof Error) {
        console.error('Unknown Error:', error.message)
        errorMessage = error.message
    } else {
        console.error('Unexpected Error:', error)
        errorMessage = 'Unexpected Error'
    }

    return errorMessage
}

export const instanceAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

instanceAxios.interceptors.request.use((config) => {
    if (config.url && config.url.startsWith('http://')) {
        console.warn('Insecure HTTP request detected:', config.url)
    }
    return config
})

instanceAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = handleApiError(error)
        return Promise.reject(new Error(errorMessage))
    }
)
