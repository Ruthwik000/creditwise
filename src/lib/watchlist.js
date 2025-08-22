// Small localStorage-backed watchlist helper for development
const KEY = 'creditwise_watchlist_v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map((i) => Number(i)) : []
  } catch (e) {
    console.warn('watchlist read error', e)
    return []
  }
}

function write(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(arr.map((i) => Number(i))))))
  } catch (e) {
    console.warn('watchlist write error', e)
  }
}

export function getWatchlist() {
  return read()
}

export function isInWatchlist(id) {
  const n = Number(id)
  return read().includes(n)
}

export function addToWatchlist(id) {
  const n = Number(id)
  const arr = read()
  if (!arr.includes(n)) arr.push(n)
  write(arr)
  return arr
}

export function removeFromWatchlist(id) {
  const n = Number(id)
  const arr = read().filter((i) => i !== n)
  write(arr)
  return arr
}

export function toggleWatchlist(id) {
  return isInWatchlist(id) ? removeFromWatchlist(id) : addToWatchlist(id)
}

export default { getWatchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist }
