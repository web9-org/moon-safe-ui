import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { SafeAppsSection } from './SafeAppsSection'
import { useAppsSearch } from '@/hooks/safe-apps/useAppsSearch'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import { SafeAppsHeader } from './SafeAppsHeader'

const SafeAppList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    allSafeApps,
    pinnedSafeApps,
    pinnedSafeAppIds,
    remoteSafeAppsLoading,
    customSafeAppsLoading,
    addCustomApp,
    customSafeApps,
    togglePin,
  } = useSafeApps()
  const filteredApps = useAppsSearch(allSafeApps, searchQuery)

  let pageBody = (
    <>
      <SafeAppsSection
        collapsible
        title={`Pinned apps (${pinnedSafeApps.length})`}
        apps={pinnedSafeApps}
        onPinApp={togglePin}
        pinnedIds={pinnedSafeAppIds}
        cardVariant="compact"
      />
      <SafeAppsSection
        collapsible
        title={`Custom apps (${customSafeApps.length})`}
        apps={customSafeApps}
        prependAddCustomAppCard
        onAddCustomApp={addCustomApp}
      />
      <SafeAppsSection
        title={`All (${allSafeApps.length})`}
        apps={allSafeApps}
        onPinApp={togglePin}
        pinnedIds={pinnedSafeAppIds}
      />
    </>
  )
  if (searchQuery) {
    if (filteredApps.length === 0) {
      pageBody = (
        <Typography variant="body1" sx={{ p: 2 }}>
          No apps found
        </Typography>
      )
    } else {
      pageBody = <SafeAppsSection title={`Search results (${filteredApps.length})`} apps={filteredApps} />
    }
  }

  if (remoteSafeAppsLoading || customSafeAppsLoading) {
    return <Typography variant="body1">Loading...</Typography>
  }

  return (
    <Grid container direction="column">
      <SafeAppsHeader searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      {pageBody}
    </Grid>
  )
}

export { SafeAppList }
