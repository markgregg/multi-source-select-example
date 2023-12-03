import Bond from "../types/Bond"

let bondCache: Bond[] = []
export const fetchBondsAndCache = (): Promise<Bond[]> => {
  if (bondCache.length > 0) {
    return new Promise<Bond[]>(resolve => resolve(bondCache))
  }

  return getData<Bond[]>('./bonds.json')
    .then(bonds => {
      bondCache = bonds
      return bondCache
    })
}

const getData = <T>(url: string): Promise<T> => {
  return fetch(url, {
    method: 'GET'
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
}