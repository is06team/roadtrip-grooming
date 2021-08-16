import { useContext } from 'react'
import { GlobalUserStoryContext } from '../../model/context'

const KpiPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  return (
    <div className="phase-container">
      <div className="phase-main">
        <h1>
          KPI de succès
          <br />
          <small>On aura eu raison de réaliser cette fonctionnalité si...</small>
        </h1>
        <fieldset>
          <textarea
            name="kpi"
            value={story.kpis}
            onChange={(e) => setStory({ ...story, kpis: e.target.value })}
          ></textarea>
        </fieldset>
      </div>
      <div className="phase-guides">
        <h3>Objectif</h3>
        <p>Justifier l'utilité business de la fonctionnalité.</p>
      </div>
    </div>
  )
}

export default KpiPhase
