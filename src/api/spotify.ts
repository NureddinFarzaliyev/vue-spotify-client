import { getRefreshToken } from '@/shared/utils/auth/getRefreshToken'
import axios from 'axios'

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

spotifyApi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

spotifyApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const newToken = await getRefreshToken()
      err.config.headers.Authorization = `Bearer ${newToken}`
      return spotifyApi(err.config)
    }
    return Promise.reject(err)
  },
)
