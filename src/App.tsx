import { useRef, useCallback, useEffect, useState } from 'react'
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MenuIcon from '@mui/icons-material/Menu'

import AssetPhase from './components/AssetPhase'
import BusinessValuePhase from './components/BusinessValuePhase'
import EnablerPhase from './components/EnablerPhase'
import ExportImportPhase from './components/ExportImportPhase'
import IncrementPhase from './components/IncrementPhase'
import KpiPhase from './components/KpiPhase'
import Menu from './components/Menu'
import NeedPhase from './components/NeedPhase'
import OldSolutionPhase from './components/OldSolutionPhase'
import SolutionPhase from './components/SolutionPhase'
import TitleBar from './components/TitleBar'

import { UserStory } from './model/types'
import { GlobalUserStoryContext } from './model/context'
import { loadStoryState, saveStoryState } from './model/storage'
import { useImportFile } from './hooks/useImportFile'
import { useExportFile } from './hooks/useExportFile'
import { defaultUserStoryData } from './model/defaultUserStoryData'
const theme = createTheme()

// Custom throttle function
const throttle = (func: (story: UserStory) => void, limit: number) => {
  let inThrottle: boolean
  return function (this: unknown, ...args: [UserStory]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const GroomingView = () => {
  const [currentPhase, setCurrentPhase] = useState<string>('need')
  const [story, setStory] = useState<UserStory>(loadStoryState())
  const saveStoryStateRef = useRef(throttle((story: UserStory) => saveStoryState(story), 5000))

  const { importFile } = useImportFile(setStory)
  const { downloadJsonExport } = useExportFile()

  useEffect(() => {
    saveStoryStateRef.current(story)
  }, [story])

  const handleChangePhase = useCallback((phase: string) => setCurrentPhase(phase), [])

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        importFile(file)
      }
    }
    input.click()
  }

  const handleExport = () => {
    downloadJsonExport(story)
  }

  const actions = [
    { icon: <DownloadIcon />, name: 'Exporter', action: handleExport },
    { icon: <UploadIcon />, name: 'Importer', action: handleImport },
    { icon: <DeleteOutlineIcon />, name: 'Effacer', action: () => setStory(defaultUserStoryData) },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalUserStoryContext.Provider value={{ story, setStory }}>
        <TitleBar />
        <Container
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Menu currentPhase={currentPhase} onChangePhase={handleChangePhase} />
          <Box sx={{ flexGrow: 1, ml: 2, mt: 2 }}>
            {currentPhase === 'need' && <NeedPhase />}
            {currentPhase === 'value' && <BusinessValuePhase />}
            {currentPhase === 'solutions' && story.solution !== '' && <OldSolutionPhase />}
            {currentPhase === 'solutions' && story.solution === '' && <SolutionPhase />}
            {currentPhase === 'kpis' && <KpiPhase />}
            {currentPhase === 'enablers' && <EnablerPhase />}
            {currentPhase === 'assets' && <AssetPhase />}
            {currentPhase === 'increments' && <IncrementPhase />}
            {currentPhase === 'export' && <ExportImportPhase />}
          </Box>
          <SpeedDial
            ariaLabel="SpeedDial menu"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={<MenuIcon />} />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
            ))}
          </SpeedDial>
        </Container>
      </GlobalUserStoryContext.Provider>
    </ThemeProvider>
  )
}

export default GroomingView
