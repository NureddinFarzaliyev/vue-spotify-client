import { generatePKCECodes } from '@/shared/utils/auth/pkce'

export const login = async () => {
  const clientId = import.meta.env.VITE_CLIENT_ID
  const redirectUri = import.meta.env.VITE_REDIRECT_URI

  const scope =
    'user-read-private user-read-email user-read-playback-state user-library-read playlist-read-private user-follow-read'
  const authUrl = new URL('https://accounts.spotify.com/authorize')

  const { codeVerifier, codeChallenge } = await generatePKCECodes()

  window.localStorage.setItem('code_verifier', codeVerifier)

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString()
  window.location.href = authUrl.toString()
}
