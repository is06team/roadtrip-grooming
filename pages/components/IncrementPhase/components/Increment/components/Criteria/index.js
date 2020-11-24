import React, { useState } from 'react'

import styles from './styles.module.scss'

const Criteria = ({ id, title, gherkin, onChange, onDelete }) => {
  /**
   * Initial data
   */
  const [data, setData] = useState({
    id: id,
    title: title,
    gherkin: gherkin,
  })

  /**
   * 
   * @param {string} field 
   * @param {string} value 
   */
  const updateField = (field, value) => {
    setData({ ...data, [field]: value })
    onChange({ ...data, [field]: value })
  }

  /**
   * Rendering
   */
  return (
    <div className="user_story_increment_criteria_item">
      <div className={styles.Criteria}>
        <div className={styles.title}>
          <input
            type="text"
            className="user_story_increment_criteria_title"
            value={data.title}
            placeholder="Titre du critère"
            onChange={(e) => updateField('title', e.target.value) } />
          <button className="criteriaTitle" onClick={() => onDelete(data.id) }>Supprimer</button>
        </div>
        <div className={styles.content}>
          <textarea
            className="user_story_increment_criteria_text"
            placeholder="GIVEN WHEN THEN"
            value={data.gherkin}
            onChange={(e) => updateField('gherkin', e.target.value)}></textarea>
        </div>        
      </div>
    </div>
  )
}

export default Criteria
