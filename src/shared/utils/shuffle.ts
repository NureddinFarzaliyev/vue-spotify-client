function fisherYatesShuffle(arr: unknown[]): unknown[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const shuffleHundred = (arr: unknown[]): unknown[] => {
  const shuffled = fisherYatesShuffle(arr)
  const hundred = shuffled.slice(0, 100)
  return hundred
}
