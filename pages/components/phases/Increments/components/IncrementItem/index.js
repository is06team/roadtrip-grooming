import Criteria from './components/Criteria'
import DIET from './components/DIET'
import Estimation from './components/Estimation'
import React from 'react'
import styles from './styles.module.scss'

const incrementTypes = [
  { type: 'flow', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
  { type: 'tracking', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
  { type: 'gdpr', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
  { type: 'ui', hasCriterias: false, hasDiet: true, hasEstimation: true, hasNotes: true },
  { type: 'release', hasCriterias: false, hasDiet: false, hasEstimation: false, hasNotes: true },
]

export default class IncrementItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'none',
      nextCriteriaId: 0,
      criterias: [],
      diet: '',
      estimation: null,
    }
  }

  addCriteria = () => {
    let criterias = this.state.criterias
    criterias.push({
      id: 'id_' + this.state.nextCriteriaId,
      title: '',
      gherkin: '',
    })
    this.setState({
      criterias: criterias,
      nextCriteriaId: this.state.nextCriteriaId + 1
    })
    this.props.onIncrementUpdated(this.props.id, this.state)
  }

  updateCriteria = (id, field, text) => {
    let criterias = []
    for (const criteria of this.state.criterias) {
      if (criteria.id === id) {
        criteria[field] = text
      }
      criterias.push(criteria)
    }
    this.setState({ criterias: criterias })
    this.props.onIncrementUpdated(this.props.id, this.state)
  }

  deleteCriteria = (id) => {
    let criterias = []
    for (const criteria of this.state.criterias) {
      if (criteria.id !== id) {
        criterias.push(criteria)
      }
    }
    this.setState({ criterias: criterias })
    this.props.onIncrementUpdated(this.props.id, this.state)
  }

  getCriteriaComponents = () => {
    let components = []
    for (const criteriaIndex in this.state.criterias) {
      const criteria = this.state.criterias[criteriaIndex]
      components.push(
        <Criteria
          id={criteria.id}
          key={'criteria_' + criteriaIndex}
          title={criteria.title}
          gherkin={criteria.gherkin}
          onChangedCriteria={(id, field, text) => { this.updateCriteria(id, field, text) }}
          onDeletedCriteria={(id) => { this.deleteCriteria(id) }}
          />)
    }
    return components
  }

  getCurrentIncrementType = () => {
    for (const incrementType of incrementTypes) {
      if (incrementType.type == this.state.type) {
        return incrementType
      }
    }
    return null
  }

  getHasCriteriaComponent = () => {
    const currentIncrementType = this.getCurrentIncrementType()
    if (currentIncrementType && currentIncrementType.hasCriterias) {
      return (
        <div className={styles.criterias}>
          <h3>Critères d'acceptation</h3>
          <div className={styles.criterias}>{this.getCriteriaComponents()}</div>
          <button onClick={() => { this.addCriteria() }}>Ajouter un critère dans cet incrément</button>
        </div>
      )
    }
    return null
  }

  getHasNotesComponent = () => {
    const currentIncrementType = this.getCurrentIncrementType()
    if (currentIncrementType && currentIncrementType.hasNotes) {
      return (
        <div className={styles.notes}>
          <h3>Notes</h3>
          <textarea placeholder="Éléments à verifier pendant les tests"></textarea>
        </div>
      )
    }
    return null
  }

  getSecondaryComponent = () => {
    const currentIncrementType = this.getCurrentIncrementType()
    if (currentIncrementType && (currentIncrementType.hasEstimation || currentIncrementType.hasDiet)) {
      return (
        <div className={styles.secondary}>
          <DIET />
          <Estimation />
        </div>
      )
    }
    return null
  }

  handleTypeChanged = (type) => {
    this.setState({ type: type })
    this.props.onIncrementUpdated(this.props.id, this.state)
  }

  handleDelete = (id) => {
    this.props.onDeleteClicked(id)
  }

  render() {
    return (
      <div className="user_story_increment_item">
        <div className={styles.Increment}>
          <div className={styles.title}>
            <h2>
              <span>{this.props.title}</span>
              <select className="title user_story_increment_type" name="type" onChange={() => { this.handleTypeChanged(event.target.value) }}>
                <option value="none">- Choisissez le type</option>
                <option value="flow">Parcours</option>
                <option value="tracking">Tracking</option>
                <option value="gdpr">GDPR</option>
                <option value="ui">UI</option>
                <option value="release">Release</option>
              </select>
            </h2>
            <button className="title" onClick={() => { this.handleDelete(this.props.id) }}>Supprimer</button>
          </div>
          <div className={styles.content}>
            {this.getHasCriteriaComponent()}
            {this.getHasNotesComponent()}
          </div>
          {this.getSecondaryComponent()}
        </div>
      </div>
    )
  }
}