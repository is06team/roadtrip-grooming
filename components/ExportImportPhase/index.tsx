import JiraExport from './components/JiraExport'
import { saveAs } from 'file-saver'
import slug from 'slug'
import styles from './styles.module.scss'
import { UserStory } from '../../model/types'
import { useContext } from 'react'
import { GlobalUserStoryContext } from '../../model/context'

const getJsonExport: (story: UserStory) => string = (story) => {
  return JSON.stringify(story, null, 4)
}

const downloadJsonExport = (story: UserStory) => {
  const blob = new Blob([getJsonExport(story)], { type: 'application/json' })
  saveAs(blob, 'UserStory-' + slug(story.title) + '.json')
}

const ExportImportPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const importFile = (file: File) => {
    if (file) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        try {
          setStory(JSON.parse(fileReader.result as string))
        } catch (e) {
          alert('Fichier invalide')
        }
      }
      fileReader.readAsText(file)
    }
  }

  return (
    <>
      <h1>Exporter / Importer</h1>
      <div className={styles.content}>
        <div className={styles.jira}>
          <JiraExport />
        </div>
        <div className={styles.json}>
          <h2>Export JSON</h2>
          <p>
            La US n'est pas terminée ? Exportez au format JSON pour la réimporter dans cet outil dans un futur grooming
            et la terminer.
          </p>
          <pre className="code">{getJsonExport(story)}</pre>
          <button onClick={() => downloadJsonExport(story)}>Télécharger</button>

          <h2>Importer JSON</h2>
          <div className="file-field-container">
            <label className="button" htmlFor="json_upload">
              Importer un fichier
            </label>
            <input
              id="json_upload"
              type="file"
              accept="application/json"
              name="importJsonFile"
              onChange={(e) => importFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ExportImportPhase
