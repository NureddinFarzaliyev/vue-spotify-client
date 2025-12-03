import { spotifyApi } from '@/api/spotify'
import { onMounted, ref } from 'vue'

export const useInfiniteScroll = (initialUrl: string, useArtists: boolean = false) => {
  const initialLoading = ref(true)
  const pageLoading = ref(false)
  const data = ref<any>([])
  const total = ref(0)
  const fetchUrl = ref(initialUrl)
  const nextExists = ref(true)

  onMounted(async () => {
    const res = await spotifyApi.get(fetchUrl.value)
    initialLoading.value = false

    const incomingData = useArtists ? res.data.artists : res.data

    data.value = incomingData.items
    total.value = incomingData.total
    if (incomingData.next) {
      fetchUrl.value = incomingData.next?.replace('https://api.spotify.com/v1', '')
    } else {
      fetchUrl.value = ''
      nextExists.value = false
    }
  })

  const fetchNextPage = async () => {
    pageLoading.value = true
    const res = await spotifyApi.get(fetchUrl.value)
    pageLoading.value = false

    const incomingData = useArtists ? res.data.artists : res.data

    data.value = [...data.value, ...incomingData.items]
    if (incomingData.next) {
      fetchUrl.value = incomingData.next?.replace('https://api.spotify.com/v1', '')
    } else {
      fetchUrl.value = ''
      nextExists.value = false
    }
  }

  return { initialLoading, pageLoading, data, total, fetchNextPage, nextExists }
}
