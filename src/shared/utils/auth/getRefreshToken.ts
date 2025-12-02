export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) {
    console.log('no refresh token')
    return
  }

  const url = 'https://accounts.spotify.com/api/token'
  const clientId = import.meta.env.VITE_CLIENT_ID

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  }
  const body = await fetch(url, payload)
  const response = await body.json()

  localStorage.setItem('access_token', response.access_token)
  if (response.refresh_token) {
    localStorage.setItem('refresh_token', response.refresh_token)
  }
}
