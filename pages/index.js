import React, { createContext, useEffect, useState } from 'react'

import AssetPhase from './components/AssetPhase'
import Breadcrumb from './components/Breadcrumb'
import BusinessValuePhase from './components/BusinessValuePhase'
import ExportImportPhase from './components/ExportImportPhase'
import IncrementPhase from './components/IncrementPhase'
import KpiPhase from './components/KpiPhase'
import NeedPhase from './components/NeedPhase'
import SolutionPhase from './components/SolutionPhase'
import styles from './styles.module.scss'
import Timer from './components/Timer'

import { defaultData } from '../model/defaultData'

export const AppDataContext = createContext({ data: defaultData })

const Main = () => {
  const [currentPhase, setCurrentPhase] = useState('')
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    document.title = 'GroomingApp'
  }, [])

  return (
    <div>
      <AppDataContext.Provider value={{ data, setData }}>
        <div className={styles.UsTitle}>
          <h1>User story :</h1>
          <input
            type="text"
            value={data.title}
            id="user_story_title"
            name="user_story[title]"
            placeholder="Titre de la US"
            onChange={(e) => setData({ ...data, title: e.target.value })} />
          <Timer></Timer>
          <button onClick={() => setData(defaultData)}>Effacer tout</button>
        </div>
        <div className={styles.Main}>
          <Breadcrumb
            data={data}
            currentPhase={currentPhase}
            onChangePhase={(phase) => setCurrentPhase(phase)} />
          <div className="phases" id="phase-items">
            <NeedPhase isCurrentPhase={currentPhase === 'need'} />
            <SolutionPhase
              isCurrentPhase={currentPhase === 'solution'}
              solution={data.solution}
              onChange={(value) => setData({ ...data, solution: value })}
              />
            <BusinessValuePhase
              isCurrentPhase={currentPhase === 'value'}
              businessValue={data.value}
              onChange={(value) => setData({ ...data, value: value })}
              />
            <KpiPhase
              isCurrentPhase={currentPhase === 'kpis'}
              kpis={data.kpis}
              onChange={(value) => setData({ ...data, kpis: value })}
              />
            <AssetPhase
              isCurrentPhase={currentPhase === 'assets'}
              assets={data.assets}
              onChange={(value) => setData({ ...data, assets: value })}
              />
            <IncrementPhase isCurrentPhase={currentPhase === 'increments'} />
            <ExportImportPhase
              isCurrentPhase={currentPhase === 'export'}
              data={data}
              onImport={(importData) => setData(importData)}
              />
          </div>
        </div>
      </AppDataContext.Provider>
    </div>
  )
}

export default Main
