import React, { useState } from 'react'

import AssetPhase from './components/AssetPhase'
import Breadcrumb from './components/Breadcrumb'
import BusinessValuePhase from './components/BusinessValuePhase'
import ExportImportPhase from './components/ExportImportPhase'
import IncrementPhase from './components/IncrementPhase'
import KpiPhase from './components/KpiPhase'
import NeedPhase from './components/NeedPhase'
import SolutionPhase from './components/SolutionPhase'
import styles from './styles.module.scss'

const Main = () => {
  const [currentPhase, setCurrentPhase] = useState('')
  const [data, setData] = useState({
    title: '',
    need: {},
    solution: '',
    value: 0,
    kpis: '',
    assets: '',
    increments: [],
  })

  return (
    <div>
      <div className={styles.UsTitle}>
        <h1>User story :</h1>
        <input
          type="text"
          value={data.title}
          id="user_story_title"
          name="user_story[title]"
          placeholder="Titre de la US"
          onChange={(e) => setData({ ...data, title: e.target.value })} />
      </div>
      <div className={styles.Main}>
        <Breadcrumb
          data={data}
          currentPhase={currentPhase}
          onChangePhase={(phase) => setCurrentPhase(phase)} />
        <div className="phases" id="phase-items">
          <NeedPhase
            isCurrentPhase={currentPhase === 'need'}
            need={data.need}
            onChange={(value) => setData({ ...data, need: value })}
            />
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
          <IncrementPhase
            isCurrentPhase={currentPhase === 'increments'}
            increments={data.increments}
            onChange={(value) => setData({ ...data, increments: value })}
            />
          <ExportImportPhase
            isCurrentPhase={currentPhase === 'export'}
            data={data}
            onImport={(importData) => setData(importData)}
            />
        </div>
      </div>
    </div>
  )
}

export default Main
