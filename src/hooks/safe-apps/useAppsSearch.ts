import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { SafeAppData } from '@gnosis.pm/safe-react-gateway-sdk'

const useAppsSearch = (apps: SafeAppData[], query: string): SafeAppData[] => {
  const fuse = useMemo(
    () =>
      new Fuse(apps, {
        keys: ['name', 'description'],
        // https://fusejs.io/api/options.html#threshold
        // Very naive explanation: threshold represents how accurate the search results should be. The default is 0.6
        // I tested it and found it to make the search results more accurate when the threshold is 0.3
        // 0 - 1, where 0 is the exact match and 1 matches anything
        threshold: 0.3,
        findAllMatches: true,
      }),
    [apps],
  )

  const results = useMemo(() => (query ? fuse.search(query).map((result) => result.item) : apps), [fuse, apps, query])

  return results
}

export { useAppsSearch }
