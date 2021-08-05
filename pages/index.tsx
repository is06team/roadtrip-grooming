import React, { createContext, useRef, useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'

import AssetPhase from './components/AssetPhase'
import Breadcrumb from './components/Breadcrumb'
import BusinessValuePhase from './components/BusinessValuePhase'
import EnablerPhase from './components/EnablerPhase'
import ExportImportPhase from './components/ExportImportPhase'
import IncrementPhase from './components/IncrementPhase'
import KpiPhase from './components/KpiPhase'
import NeedPhase from './components/NeedPhase'
import SolutionPhase from './components/SolutionPhase'
import styles from './styles.module.scss'
import Timer from './components/Timer'

import { defaultUserStoryData } from '../model/defaultUserStoryData'
import { UserStory } from '../model/types'

type UserStoryContext = {
  story: UserStory,
  setStory: (story: UserStory) => void,
}

export const GlobalUserStoryContext = createContext<UserStoryContext>({
  story: defaultUserStoryData,
  setStory: () => {}
})

const loadStoryState = () => {
  try {
    if (typeof(window) === 'undefined') {
      return defaultUserStoryData
    }
    const storyState = window.localStorage.getItem('story')
    if (storyState === null) {
      return defaultUserStoryData
    }
    return JSON.parse(storyState)
  } catch (error) {
    console.warn('Unable to load story state from local storage')
    return defaultUserStoryData
  }
}

const saveStoryState = (story: UserStory) => {
  try {
    if (typeof(window) !== 'undefined') {
      const storyState = JSON.stringify(story)
      window.localStorage.setItem('story', storyState)
      console.info('Story state saved to local storage')
    }
  } catch {
    console.warn('Unable to save story state to local storage')
  }
}

const MainView = () => {
  const [currentPhase, setCurrentPhase] = useState<string>('')
  const [story, setStory] = useState<UserStory>(loadStoryState())
  const saveStoryStateRef = useRef(throttle((story: UserStory) => saveStoryState(story), 5000))

  useEffect(() => {
    document.title = 'GroomingApp'
  }, [])

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
            onChange={(e) => setStory({ ...story, title: e.target.value })} />
          <Timer></Timer>
          <button onClick={() => setStory(defaultUserStoryData)}>Effacer tout</button>
        </div>
        <div className={styles.Main}>
          <Breadcrumb
            currentPhase={currentPhase}
            onChangePhase={useCallback((phase) => setCurrentPhase(phase), [])} />
          <div className="phases" id="phase-items">
            {currentPhase === 'need' && <NeedPhase />}
            {currentPhase === 'solution' && <SolutionPhase />}
            {currentPhase === 'value' && <BusinessValuePhase />}
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

export default MainView
