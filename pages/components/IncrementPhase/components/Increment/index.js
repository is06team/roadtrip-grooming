import React, { useState } from 'react'

import Checklist from './components/Checklist'
import Criteria from './components/Criteria'
import Estimation from './components/Estimation'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid';

const Increment = ({ id, type, estimation, checklist, notes, criterias, onChange, onDelete }) => {
  const [ data, setData ] = useState({
    id: id,
    type: type,
    estimation: estimation,
    checklist: checklist,
    notes: notes,
    criterias: criterias,
  })

  const incrementTypes = [
    { type: 'flow', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
    { type: 'tracking', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
    { type: 'gdpr', hasCriterias: true, hasDiet: true, hasEstimation: true, hasNotes: false },
    { type: 'ui', hasCriterias: false, hasDiet: true, hasEstimation: true, hasNotes: true },
    { type: 'release', hasCriterias: false, hasDiet: false, hasEstimation: false, hasNotes: true },
  ]

  const handleChangeData = (newData) => {
    setData(newData)
    onChange(newData)
  }

  const getCurrentIncrementType = () => {
    for (const incrementType of incrementTypes) {
      if (incrementType.type === data.type) {
        return incrementType
      }
    }
    return null
  }

  /**
   * Add a criteria into the increment
   */
  const addCriteria = () => {
    let criterias = data.criterias
    criterias.push({ id: uuidv4(), title: '', gherkin: '' })
    setData({ ...data, criterias: criterias })
    onChange({ ...data, criterias: criterias })
  }

  /**
   * Update a criteria data with a specific id
   * @param {uuid} id 
   * @param {Object} value 
   */
  const updateCriteria = (id, value) => {
    let criterias = data.criterias
    for (const index in criterias) {
      if (id === criterias[index].id) {
        criterias[index] = value
      }
    }
    setData({ ...data, criterias: criterias })
    onChange({ ...data, criterias: criterias })
  }

  /**
   * Remove a criteria with a specific id 
   * @param {uuid} id
   */
  const deleteCriteria = (id) => {
    let criterias = []
    for (const index in data.criterias) {
      if (id !== data.criterias[index].id) {
        criterias[index] = data.criterias[index]
      }
    }
    setData({ ...data, criterias: criterias })
    onChange({ ...data, criterias: criterias })
  }

  const getCriterias = (criterias) => {
    const currentIncrementType = getCurrentIncrementType()
    if (currentIncrementType && currentIncrementType.hasCriterias) {
      return (
        <div className={styles.criterias}>
          <h3>Critères d'acceptation</h3>
          <div className={styles.criterias}>
            {criterias.map(criteria => {
              return (
                <Criteria
                  id={criteria.id}
                  key={criteria.id}
                  title={criteria.title}
                  gherkin={criteria.gherkin}
                  onChange={(value) => updateCriteria(criteria.id, value)}
                  onDelete={(id) => deleteCriteria(id) }
                  />
              )
            })}
          </div>
          <button onClick={() => addCriteria()}>Ajouter un critère dans cet incrément</button>
        </div>
      )
    }
    return null
  }

  const updateNotes = (notes) => {
    setData({ ...data, notes: notes })
    onChange({ ...data, notes: notes })
  }

  const getNotes = (notes) => {
    const currentIncrementType = getCurrentIncrementType()
    if (currentIncrementType && currentIncrementType.hasNotes) {
      return (
        <div className={styles.notes}>
          <h3>Notes</h3>
          <textarea
            className="user_story_increment_notes"
            placeholder="Éléments à verifier pendant les tests"
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
            ></textarea>
        </div>
      )
    }
    return null
  }

  const updateChecklist = (checklist) => {
    setData({ ...data, checklist: checklist })
    onChange({ ...data, checklist: checklist })
  }

  const getSecondary = (estimation, checklist) => {
    const currentIncrementType = getCurrentIncrementType()
    if (currentIncrementType && (currentIncrementType.hasEstimation || currentIncrementType.hasDiet)) {
      return (
        <div className={styles.secondary}>
          <Checklist checklist={checklist} onChange={(value) => updateChecklist(value)} />
          <Estimation estimation={estimation} onChange={(newEstimation) => handleChangeData({ ...data, estimation: newEstimation })} />
        </div>
      )
    }
    return null
  }

  const getTypeSelector = (currentType) => {
    return (
      <select className="title user_story_increment_type" name="type" value={currentType} onChange={(e) => handleChangeData({ ...data, type: e.target.value })}>
        <option value="none">- Choisissez le type</option>
        <option value="flow" selected={currentType === 'flow' ? 'selected' : ''}>Parcours</option>
        <option value="tracking" selected={currentType === 'tracking' ? 'selected' : ''}>Tracking</option>
        <option value="gdpr" selected={currentType === 'gdpr' ? 'selected' : ''}>GDPR</option>
        <option value="ui" selected={currentType === 'ui' ? 'selected' : ''}>UI</option>
        <option value="release" selected={currentType === 'release' ? 'selected' : ''}>Release</option>
      </select>
    )
  }

  return (
    <div className="user_story_increment_item">
      <div className={styles.Increment}>
        <div className={styles.title}>
          <h2>
            <span>Incrément</span>
            {getTypeSelector(data.type)}
          </h2>
          <button className="title" onClick={() => onDelete(data.id)}>Supprimer</button>
        </div>
        <div className={styles.content}>
          {getCriterias(data.criterias)}
          {getNotes(data.notes)}
        </div>
        {getSecondary(data.estimation, data.checklist)}
      </div>
    </div>
  )
}

export default Increment
