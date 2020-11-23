import JiraExport from './components/JiraExport'
import { saveAs } from 'file-saver'
import styles from './styles.module.scss'

const ExportImportPhase = ({ isCurrentPhase, data, onImport }) => {
  const getJsonExport = () => {
    return JSON.stringify(data, null, 4)
  }

  const downloadJsonExport = () => {
    const blob = new Blob([getJsonExport()], { type: 'application/json' })
    saveAs(blob, 'UserStory.json');
  }

  const importFile = (file) => {
    onImport()
  }

  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <h1>Exporter / Importer</h1>
      <div className={styles.content}>
        <div className={styles.jira}>
          <h2>JIRA</h2>
          <p>Vous pouvez copier le code ci-dessous pour le coller dans des tickets JIRA.</p>
          <JiraExport data={data} />
        </div>
        <div className={styles.json}>
          <h2>Export JSON</h2>
          <p>La US n'est pas terminée ? Exportez au format JSON pour la réimporter dans cet outil dans un futur grooming et la terminer.</p>
          <pre className="code">
            {getJsonExport()}
          </pre>
          <button onClick={() => downloadJsonExport()}>Télécharger</button>

          <h2>Importer JSON</h2>
          <div>
            <input
              type="file"
              accept="application/json"
              name="importJsonFile"
              onChange={(e) => importFile(e.target.files[0])} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportImportPhase