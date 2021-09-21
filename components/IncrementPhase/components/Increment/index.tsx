import React, { useCallback, useState } from 'react'

import ChecklistView from './components/Checklist'
import CriteriaView from './components/Criteria'
import Estimation from './components/Estimation'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { Checklist, Criteria, Increment, IncrementType } from '../../../../model/types'
import { incrementTypes } from '../../../../config/increments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
  id: string
  type: IncrementType
  estimation: number
  checklist: Checklist
  notes: string
  criterias: Criteria[]
  dependencies: string
  onChange: (increment: Increment) => void
  onDelete: (incrementId: string) => void
}

const IncrementView = ({
  id,
  type = IncrementType.none,
  estimation,
  checklist,
  notes,
  criterias,
  dependencies,
  onChange,
  onDelete,
}: Props) => {
  const [increment, setIncrement] = useState<Increment>({
    id: id,
    type: type,
    estimation: estimation,
    checklist: checklist,
    notes: notes,
    criterias: criterias,
    dependencies: dependencies,
  })

  const handleChangeIncrementData = (newData: Increment) => {
    setIncrement(newData)
    onChange(newData)
  }

  const getCurrentIncrementType = () => {
    for (const incrementType of incrementTypes) {
      if (incrementType.id === increment.type) {
        return incrementType
      }
    }
    return null
  }

  const addCriteria = () => {
    let criterias = increment.criterias
    criterias.push({ id: uuidv4(), title: '', gherkin: '' })
    setIncrement({ ...increment, criterias: criterias })
    onChange({ ...increment, criterias: criterias })
  }

  const updateCriteria = (id: string, value: Criteria) => {
    let criterias = increment.criterias
    for (const index in criterias) {
      if (id === criterias[index].id) {
        criterias[index] = value
      }
    }
    setIncrement({ ...increment, criterias: criterias })
    onChange({ ...increment, criterias: criterias })
  }

  const deleteCriteria = (criteriaId: string) => {
    let criterias = []
    for (const index in increment.criterias) {
      if (criteriaId !== increment.criterias[index].id) {
        criterias[index] = increment.criterias[index]
      }
    }
    setIncrement({ ...increment, criterias: criterias })
    onChange({ ...increment, criterias: criterias })
  }

  const getCriterias = (criterias: Criteria[]) => {
    const currentIncrementType = getCurrentIncrementType()
    if (currentIncrementType && currentIncrementType.hasCriterias) {
      return (
        <div className={styles.criterias}>
          <h3>Critères d'acceptation</h3>
          <div className={styles.criterias}>
            {criterias.map((criteria) => {
              return (
                <CriteriaView
                  id={criteria.id}
                  key={criteria.id}
                  title={criteria.title}
                  gherkin={criteria.gherkin}
                  onChange={(value) => updateCriteria(criteria.id, value)}
                  onDelete={(id) => deleteCriteria(id)}
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

  const updateNotes = (notes: string) => {
    setIncrement({ ...increment, notes: notes })
    onChange({ ...increment, notes: notes })
  }

  const getNotes = (notes: string) => {
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

  const updateChecklist = (checklist: Checklist) => {
    setIncrement({ ...increment, checklist: checklist })
    onChange({ ...increment, checklist: checklist })
  }

  const getSecondary = (estimation: number, checklist: Checklist) => {
    const currentIncrementType = getCurrentIncrementType()
    if (currentIncrementType && (currentIncrementType.hasEstimation || currentIncrementType.hasDiet)) {
      return (
        <div className={styles.secondary}>
          {currentIncrementType.hasDiet && (
            <ChecklistView checklist={checklist} onChange={(value) => updateChecklist(value)} />
          )}
          {currentIncrementType.hasEstimation && (
            <Estimation
              estimation={estimation}
              incrementTypeName={type.valueOf()}
              onChange={(newEstimation) => handleChangeIncrementData({ ...increment, estimation: newEstimation })}
            />
          )}
        </div>
      )
    }
    return null
  }

  const updateDependencies = (dependencies: string) => {
    setIncrement({ ...increment, dependencies: dependencies })
    onChange({ ...increment, dependencies: dependencies })
  }

  const getDependencies = () => {
    const currentIncrementType = getCurrentIncrementType()
    return (
      <>
        {currentIncrementType && currentIncrementType.hasDependencies && (
          <div className={styles.dependencies}>
            <div className="field">
              <label>Dépendant de :</label>
              <input type="text" value={increment.dependencies} onChange={(e) => updateDependencies(e.target.value)} />
            </div>
          </div>
        )}
      </>
    )
  }

  const getTypeSelector = (currentType: IncrementType) => {
    return (
      <select
        className="title user_story_increment_type"
        name="type"
        value={currentType.valueOf()}
        onChange={(event) => handleChangeIncrementData({ ...increment, type: event.target.value as IncrementType })}
      >
        <option value="none">- Choisissez le type</option>
        {incrementTypes.map((type) => (
          <option value={type.id} key={'increment_type_' + type.id}>
            {type.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="user_story_increment_item">
      <div className={styles.Increment}>
        <div className={styles.title}>
          <h2>
            <span>Incrément</span>
            {getTypeSelector(increment.type)}
          </h2>
          <button className="title" onClick={() => onDelete(increment.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className={styles.content}>
          {getCriterias(increment.criterias)}
          {getNotes(increment.notes)}
        </div>
        {getSecondary(increment.estimation, increment.checklist)}
        {getDependencies()}
      </div>
    </div>
  )
}

export default IncrementView
