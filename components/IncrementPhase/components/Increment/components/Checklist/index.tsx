import React, { useState } from 'react'
import { Checklist } from '../../../../../../model/types'
import styles from './styles.module.scss'

type Props = {
  checklist: Checklist
  onChange: (checklist: Checklist) => void
}

const defaultChecklist: Checklist = {
  d: false,
  i: false,
  e: false,
  t: false,
}

const ChecklistView = ({ checklist = defaultChecklist, onChange }: Props) => {
  const [data, setData] = useState({
    d: checklist.d,
    i: checklist.i,
    e: checklist.e,
    t: checklist.t,
  })

  const updateItem = (field: string, value: boolean) => {
    setData({ ...data, [field]: value })
    onChange({ ...data, [field]: value })
  }

  return (
    <div className={styles.DIET}>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_d"
          checked={data.d}
          onChange={(e) => updateItem('d', e.target.checked)}
        />
        <label>D</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_i"
          checked={data.i}
          onChange={(e) => updateItem('i', e.target.checked)}
        />
        <label>I</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_e"
          checked={data.e}
          onChange={(e) => updateItem('e', e.target.checked)}
        />
        <label>E</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input
          type="checkbox"
          className="user_story_increment_diet_t"
          checked={data.t}
          onChange={(e) => updateItem('t', e.target.checked)}
        />
        <label>T</label>
      </span>
    </div>
  )
}

export default ChecklistView
