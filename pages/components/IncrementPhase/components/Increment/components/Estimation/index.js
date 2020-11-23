import React from 'react'
import styles from './styles.module.scss';

const Estimation = ({ estimation, onChange }) => {
  return (
    <div className={styles.Estimation}>
      <label>Estimation</label>
      <select className="medium user_story_increment_estimation" value={estimation} onChange={(e) => onChange(parseFloat(e.target.value))}>
        <option>- Choisissez</option>
        <option>0.5</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>5</option>
        <option>8</option>
        <option>13</option>
        <option>21</option>
        <option>34</option>
      </select>
    </div>
  )
}

export default Estimation
