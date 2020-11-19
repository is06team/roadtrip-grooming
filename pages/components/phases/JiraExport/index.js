import React from 'react'
import styles from './styles.module.scss'

const incrementTypes = {
  'none': '',
  'flow': 'parcours',
  'tracking': 'tracking',
  'gdpr': 'GDPR',
  'ui': 'UI',
  'releas': 'Release',
}

export default class JiraExport extends React.Component {
  constructor(props) {
    super(props)
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
      text += (dietD[0].checked ? 'D' : '')
      text += (dietI[0].checked ? 'I' : '')
      text += (dietE[0].checked ? 'E' : '')
      text += (dietT[0].checked ? 'T' : '')
    }
    return text
  }

  getIncrementEstimation = (increment) => {
    let text = ''
    const estimations = increment.getElementsByClassName('user_story_increment_estimation')
    if (estimations !== null) {
      text += '\nEstimation : ' + estimations[0].value
    }
    return text
  }

  getCriterias = (increment) => {
    let text = '\n\nh2. Critères d\'acceptation'
    const criterias = increment.getElementsByClassName('user_story_increment_criteria_item')
    if (criterias !== null) {
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

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div>
          <h1>Export JIRA</h1>

          <pre className={styles.code}>
            {this.getCode()}
          </pre>
        </div>  
      </div>
    )
  }
}