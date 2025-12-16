export const prepareNextUrl = (url: string): string => {
  if (!url) return ''
  return url.replace('https://api.spotify.com/v1', '')
}
