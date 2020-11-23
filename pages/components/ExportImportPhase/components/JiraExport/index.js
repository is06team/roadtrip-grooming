import styles from './styles.module.scss'

const JiraExport = ({ data }) => {
  const getIncrement = (increment) => {
    return (
      <div className={styles.increment}>
        <h3>{data.title} : {increment.type} (Ticket "Story increment")</h3>
        {increment.estimation > 0 && (<div><strong>Estimation</strong> : {increment.estimation}</div>)}
        {increment.estimation > 0 && (<div><strong>ROI</strong> : {parseInt(data.value / increment.estimation)}</div>)}
        {(increment.type !== 'release') && getChecklist(increment.checklist)}
        <pre className="code">
          <div>{increment.criterias.length > 0 && getCriterias(increment.criterias)}</div>
          {increment.notes && (
            <div>
              <div>h2. Notes<br /><br /></div>
              <div>{increment.notes}</div>
            </div>
          )}
        </pre>
      </div>
    )
  }

  const getChecklist = (checklist) => {
    return (
      <div>
        <strong>
          {checklist.d ? 'D' : '-'}
          {checklist.i ? 'I' : '-'}
          {checklist.e ? 'E' : '-'}
          {checklist.t ? 'T' : '-'}
        </strong>
        {(checklist.d && checklist.i && checklist.e && checklist.t)
          ? ' -> A placer dans "Ready for sprint"'
          : ' -> Laisser dans "Ready for grooming"'}
        <br />
      </div>
    )
  }

  const getCriterias = (criterias) => {
    return (
      <div>
        <div>h2. Critères d'acceptation<br /><br /></div>
        <div>
          {criterias.map(criteria => {
            return (
              <div>
                <div>{'{panel:title=' + criteria.title + '}'}</div>
                <div>{criteria.gherkin}</div>
                <div>{'{panel}'}<br /><br /></div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3>{data.title} (Ticket "Story")</h3>
      <p><strong>Valeur métier :</strong> {data.value}</p>
      <div className={styles.US}>
        <pre className="code">
          <div>h2. Besoin<br /><br /></div>
          <div>
            *ETQ* {data.need.as}<br />
            *JS* {data.need.want}<br />
            *AD* {data.need.to}<br /><br />
          </div>
          <div>h2. Solution fonctionnelle<br /><br /></div>
          <div>{data.solution || 'Néant'}<br /><br /></div>
          <div>h2. KPIs de succès<br /><br /></div>
          <div>{data.kpis || 'Néant'}<br /><br /></div>
          <div>h2. Assets<br /><br /></div>
          <div>{data.assets || 'Néant'}<br /><br /></div>
        </pre>
      </div>
      {data.increments.map(increment => getIncrement(increment))}
    </div>
  )
}

export default JiraExport
