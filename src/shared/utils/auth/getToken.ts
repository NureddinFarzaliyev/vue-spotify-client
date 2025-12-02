export const getToken = async (code) => {
  const codeVerifier = localStorage.getItem('code_verifier')

  if (!codeVerifier) {
    console.log('No code verifier')
    return
  }

  const redirectUri = import.meta.env.VITE_REDIRECT_URI

  const url = 'https://accounts.spotify.com/api/token'
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload)
  const response = await body.json()

  localStorage.setItem('access_token', response.access_token)
  localStorage.setItem('refresh_token', response.refresh_token)

  if (response.access_token) {
    return true
  } else {
    return false
  }
}
