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
import Timer from '../components/Timer'

import { defaultUserStoryData } from '../model/defaultUserStoryData'
import { UserStory } from '../model/types'
import { GlobalUserStoryContext } from '../model/context'
import { loadStoryState, saveStoryState } from '../model/storage'

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
        <div className={styles.UsTitle}>
          <h1>User story :</h1>
          <input
            type="text"
            value={story.title}
            id="user_story_title"
            name="user_story[title]"
            placeholder="Titre de la US"
            onChange={(e) => setStory({ ...story, title: e.target.value })}
          />
          <Timer />
          <button onClick={() => setStory(defaultUserStoryData)}>Effacer tout</button>
        </div>
        <div className={styles.Main}>
          <Breadcrumb currentPhase={currentPhase} onChangePhase={useCallback((phase) => setCurrentPhase(phase), [])} />
          <div className="phases" id="phase-items">
            {currentPhase === 'need' && <NeedPhase />}
            {currentPhase === 'value' && <BusinessValuePhase />}
            {(currentPhase === 'solutions' && story.solution !== "") && <OldSolutionPhase />}
            {(currentPhase === 'solutions' && story.solution === '') && <SolutionPhase />}
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
