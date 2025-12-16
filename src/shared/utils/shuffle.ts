function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }
  return result
}

export const shuffleHundred = <T>(arr: T[]): T[] => {
  const shuffled = fisherYatesShuffle(arr)
  const hundred = shuffled.slice(0, 100)
  return hundred
}
