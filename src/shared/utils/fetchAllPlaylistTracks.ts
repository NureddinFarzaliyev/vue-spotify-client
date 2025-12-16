import { spotifyApi } from '@/api/spotify'
import { prepareNextUrl } from '@/shared/utils/prepareNextUrl'

export const fetchAllPlaylistTracks = async (initUrl: string): Promise<unknown[] | undefined> => {
  try {
    let url = initUrl
    const tracks = []

    while (url && url !== '') {
      const res = await spotifyApi.get(url)
      if (res.data) {
        url = prepareNextUrl(res.data.next)
        tracks.push(...res.data.items)
      } else {
        return
      }
    }
    return tracks
  } catch (error) {
    console.error(error)
    return
  }
}
