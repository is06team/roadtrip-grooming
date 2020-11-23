import React, { useState } from 'react'

import styles from './styles.module.scss'

const Checklist = ({ checklist, onChange }) => {
  /**
   * Initial data
   */
  const [data, setData] = useState({
    checklist: checklist
  })

  const updateItem = (field, value) => {
    let checklist = data.checklist
    checklist[field] = value
    setData({ ...data, checklist: checklist })
    onChange({ ...data, checklist: checklist })
  }

  /**
   * Rendering
   */
  return (
    <div className={styles.DIET}>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_d"
          checked={data.checklist.d ? 'checked' : ''}
          onChange={(e) => updateItem('d', e.target.checked)}
          />
        <label>D</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_i"
          checked={data.checklist.i}
          onChange={(e) => updateItem('i', e.target.checked)}
          />
        <label>I</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_e"
          checked={data.checklist.e}
          onChange={(e) => updateItem('e', e.target.checked)}
          />
        <label>E</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_t"
          checked={data.checklist.t}
          onChange={(e) => updateItem('t', e.target.checked)}
          />        
        <label>T</label>
      </span>
    </div>
  )
}

export default Checklist