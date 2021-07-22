type Props = {
  isCurrentPhase: boolean,
  kpis: string,
  onChange: (kpis: string) => void,
}

const KpiPhase = ({ isCurrentPhase, kpis, onChange }: Props) => {
  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <div className="phase-container">
        <div className="phase-main">
          <h1>KPI de succès<br />
            <small>On aura eu raison de réaliser cette fonctionnalité si...</small>
          </h1>
          <fieldset>
            <textarea name="kpi" value={kpis} onChange={(e) => onChange(e.target.value)}></textarea>
          </fieldset>
        </div>
        <div className="phase-guides">
          <h3>Objectif</h3>
          <p>Justifier l'utilité business de la fonctionnalité.</p>
        </div>
      </div>
    </div>
  )
}

export default KpiPhase