export const displayArtists = (artists: { name: string }[]) => {
  return artists.reduce((acc, val, idx) => {
    if (idx === artists.length - 1) {
      return acc + val.name
    } else {
      return acc + val.name + ', '
    }
  }, '')
}
