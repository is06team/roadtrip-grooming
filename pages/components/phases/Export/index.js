import React from 'react'
import { saveAs } from 'file-saver'
import styles from './styles.module.scss'

const incrementTypes = {
  'none': '',
  'flow': 'parcours',
  'tracking': 'tracking',
  'gdpr': 'GDPR',
  'ui': 'UI',
  'release': 'Release',
}

export default class Export extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }

  getElementById = (id) => {
    if (typeof(document) !== 'undefined') {
      return document.getElementById(id)
    }
    return null
  }

  getElementsByClassName = (name) => {
    if (typeof(document) !== 'undefined') {
      return document.getElementsByClassName(name)
    }
    return null
  }

  getFormValue = (id) => {
    const element = this.getElementById(id)
    if (typeof(element) !== 'undefined' && element !== null) {
      return element.value
    }
    return ''
  }

  getIncrements = () => {
    let text = ''
    const increments = this.getElementsByClassName('user_story_increment_item')
    if (increments !== null) {
      for (let i = 0; i < increments.length; i++) {
        const increment = increments[i]
        const incrementType = increment.getElementsByClassName('user_story_increment_type')[0].value
        text += '\nIncrement ' + incrementTypes[incrementType]
        text += '\n---------------------------------------------'
        text += this.getIncrementDiet(increment)
        text += this.getIncrementEstimation(increment)
        text += this.getCriterias(increment)
        text += this.getIncrementNotes(increment)
        text += '\n\n'
      }
    }
    return text
  }

  getIncrementDiet = (increment) => {
    let text = ''
    const dietD = increment.getElementsByClassName('user_story_increment_diet_d')
    const dietI = increment.getElementsByClassName('user_story_increment_diet_i')
    const dietE = increment.getElementsByClassName('user_story_increment_diet_e')
    const dietT = increment.getElementsByClassName('user_story_increment_diet_t')
    

    if (dietD !== null && dietI !== null && dietE !== null && dietT !== null) {
      text += '\n'
      text += (typeof(dietD[0]) !== 'undefined' && dietD[0].checked ? 'D' : '-')
      text += (typeof(dietI[0]) !== 'undefined' &&dietI[0].checked ? 'I' : '-')
      text += (typeof(dietE[0]) !== 'undefined' &&dietE[0].checked ? 'E' : '-')
      text += (typeof(dietT[0]) !== 'undefined' &&dietT[0].checked ? 'T' : '-')
    }
    return text
  }

  getIncrementEstimation = (increment) => {
    let text = ''
    const estimations = increment.getElementsByClassName('user_story_increment_estimation')
    if (estimations !== null && typeof(estimations[0]) !== 'undefined') {
      text += '\nEstimation : ' + estimations[0].value
    }
    return text
  }

  getCriterias = (increment) => {
    let text = ''
    const criterias = increment.getElementsByClassName('user_story_increment_criteria_item')
    if (criterias !== null && criterias.length > 0) {
      text += '\n\nh2. Critères d\'acceptation'
      for (let i = 0; i < criterias.length; i++) {
        const criteria = criterias[i]
        text += '\n\n{panel:title=' + this.getCriteriaTitle(criteria) + '}'
        text += '\n' + this.getCriteriaText(criteria)
        text += '\n{panel}'
      }
    }
    return text
  }

  getCriteriaTitle = (criteria) => {
    const titles = criteria.getElementsByClassName('user_story_increment_criteria_title')
    if (titles !== null) {
      return titles[0].value
    }
    return ''
  }

  getCriteriaText = (criteria) => {
    const texts = criteria.getElementsByClassName('user_story_increment_criteria_text')
    if (texts !== null) {
      return texts[0].value
    }
    return ''
  }

  getIncrementNotes = (increment) => {
    let text = ''
    const notes = increment.getElementsByClassName('user_story_increment_notes')
    if (notes !== null && typeof(notes[0]) !== 'undefined') {
      text += '\n\nh2. Notes\n'
      text += '\n' + notes[0].value
    }
    return text
  }

  getCode = () => {
    let text = 'User story'
    text += '\n---------------------------------------------'
    text += '\nTitre : ' + this.getFormValue('user_story_title')
    text += '\nBusiness Value : ' + this.getFormValue('user_story_business_value')

    text += '\n\nh2. Besoin\n'
    text += '\n*ETQ* ' + this.getFormValue('user_story_need_as')
    text += '\n*JS* ' + this.getFormValue('user_story_need_want')
    text += '\n*AD* ' + this.getFormValue('user_story_need_to')

    text += '\n\nh2. Solution fonctionnelle choisie\n\n'
    text += this.getFormValue('user_story_solution')

    text += '\n\nh2. Assets\n\n'
    text += this.getFormValue('user_story_assets')
    text += '\n\n'

    text += this.getIncrements()

    return text
  }

  getJsonExport = () => {
    return JSON.stringify(this.props.exportData, null, 4)
  }

  downloadJsonExport = () => {
    const blob = new Blob([this.getJsonExport()], { type: 'application/json' })
    saveAs(blob, 'UserStory.json');
  }

  /**
   * Import the file from a given file input event
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  importFile = (file) => {
    if (file) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        try {
          this.props.onDataImported(JSON.parse(fileReader.result))
        } catch (e) {
          alert('Fichier invalide')
        }
      }
      fileReader.readAsText(file)
    }
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <h1>Exporter / Importer</h1>
        <div className={styles.content}>
          <div className={styles.jira}>
            <h2>JIRA</h2>
            <p>Vous pouvez copier le code ci-dessous pour le coller dans des tickets JIRA.
              À terme, une fonction de synchronisation permettra de créer automatiquement les tickets.
            </p>
            <pre className={styles.code}>
              {this.getCode()}
            </pre>
          </div>
          <div className={styles.json}>
            <h2>Export JSON</h2>
            <p>La US n'est pas terminée ? Exportez au format JSON pour la réimporter dans cet outil dans un futur grooming et la terminer.</p>
            <pre className={styles.code}>
              {this.getJsonExport()}
            </pre>
            <button onClick={() => this.downloadJsonExport()}>Télécharger</button>

            <h2>Importer JSON</h2>
            <div>
              <input
                type="file"
                accept="application/json"
                ref="upload"
                name="importJsonFile"
                onChange={(e) => this.importFile(e.target.files[0])} />
            </div>
          </div>
        </div>  
      </div>
    )
  }
}