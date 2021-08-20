import React, { useRef, useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'

import AssetPhase from '../components/AssetPhase'
import Breadcrumb from '../components/Breadcrumb'
import BusinessValuePhase from '../components/BusinessValuePhase'
import EnablerPhase from '../components/EnablerPhase'
import ExportImportPhase from '../components/ExportImportPhase'
import IncrementPhase from '../components/IncrementPhase'
import KpiPhase from '../components/KpiPhase'
import NeedPhase from '../components/NeedPhase'
import SolutionPhase from '../components/SolutionPhase'
import OldSolutionPhase from '../components/OldSolutionPhase'
import styles from './styles.module.scss'

import { UserStory } from '../model/types'
import { GlobalUserStoryContext } from '../model/context'
import { loadStoryState, saveStoryState } from '../model/storage'
import TitleBar from '../components/TitleBar'

const GroomingView = () => {
  const [currentPhase, setCurrentPhase] = useState<string>('')
  const [story, setStory] = useState<UserStory>(loadStoryState())
  const saveStoryStateRef = useRef(throttle((story: UserStory) => saveStoryState(story), 5000))

  useEffect(() => {
    saveStoryStateRef.current(story)
  }, [story])

  return (
    <>
      <GlobalUserStoryContext.Provider value={{ story, setStory }}>
        <TitleBar />
        <div className={styles.Main}>
          <Breadcrumb currentPhase={currentPhase} onChangePhase={useCallback((phase) => setCurrentPhase(phase), [])} />
          <div className="phases" id="phase-items">
            {currentPhase === 'need' && <NeedPhase />}
            {currentPhase === 'value' && <BusinessValuePhase />}
            {currentPhase === 'solutions' && story.solution !== '' && <OldSolutionPhase />}
            {currentPhase === 'solutions' && story.solution === '' && <SolutionPhase />}
            {currentPhase === 'kpis' && <KpiPhase />}
            {currentPhase === 'enablers' && <EnablerPhase />}
            {currentPhase === 'assets' && <AssetPhase />}
            {currentPhase === 'increments' && <IncrementPhase />}
            {currentPhase === 'export' && <ExportImportPhase />}
          </div>
        </div>
      </GlobalUserStoryContext.Provider>
    </>
  )
}

export default GroomingView
