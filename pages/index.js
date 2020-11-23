import React, { useState } from 'react'

import Ariane from './components/Ariane'
import AssetPhase from './components/AssetPhase'
import BusinessValuePhase from './components/BusinessValuePhase'
import ExportImportPhase from './components/ExportImportPhase'
import IncrementPhase from './components/IncrementPhase'
import KpiPhase from './components/KpiPhase'
import NeedPhase from './components/NeedPhase'
import SolutionPhase from './components/SolutionPhase'
import styles from './styles.module.scss'

const Main = () => {
  const [state, setState] = useState({
    currentPhase: '',
    recaps: {},
  })
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
        <Ariane
          data={data}
          currentPhase={state.currentPhase}
          onChangePhase={(phase) => setState({ ...state, currentPhase: phase })} />
        <div className="phases" id="phase-items">
          <NeedPhase
            isCurrentPhase={state.currentPhase === 'need'}
            need={data.need}
            onChange={(value) => setData({ ...data, need: value })}
            />
          <SolutionPhase
            isCurrentPhase={state.currentPhase === 'solution'}
            solution={data.solution}
            onChange={(value) => setData({ ...data, solution: value })}
            />
          <BusinessValuePhase
            isCurrentPhase={state.currentPhase === 'value'}
            businessValue={data.value}
            onChange={(value) => setData({ ...data, value: value })}
            />
          <KpiPhase
            isCurrentPhase={state.currentPhase === 'kpis'}
            kpis={data.kpis}
            onChange={(value) => setData({ ...data, kpis: value })}
            />
          <AssetPhase
            isCurrentPhase={state.currentPhase === 'assets'}
            assets={data.assets}
            onChange={(value) => setData({ ...data, assets: value })}
            />
          <IncrementPhase
            isCurrentPhase={state.currentPhase === 'increments'}
            increments={data.increments}
            onChange={(value) => setData({ ...data, increments: value.increments })}
            />
          <ExportImportPhase
            isCurrentPhase={state.currentPhase === 'export'}
            data={data}
            onImport={() => {}}
            />
        </div>
      </div>
    </div>
  )
}

export default Main
