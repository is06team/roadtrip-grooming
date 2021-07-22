import React from 'react'
import styles from './styles.module.scss';

type Props = {
  estimation: number,
  onChange: (estimation: number) => void,
}

const copySlackPollToClipboard = (incrementName: string) => {
  let pollText = '/poll "Estimation of ' + incrementName + '" '
  pollText += '"for a complexity of 0.5" '
  pollText += '"for a complexity of 1" '
  pollText += '"for a complexity of 2" '
  pollText += '"for a complexity of 3" '
  pollText += '"for a complexity of 5" '
  pollText += '"for a complexity of 8" '
  pollText += '"for a complexity of 13" '
  pollText += '"for a complexity of 21" '
  pollText += '"HIGHHHHHHHEEEEEEEER" '
  pollText += ' limit 1'
  navigator.clipboard.writeText(pollText)
}

const Estimation = ({ estimation, onChange }: Props) => {
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
      </select>
      <button className="slackPoll" onClick={() => copySlackPollToClipboard}><i className="fab fa-slack"></i></button>
    </div>
  )
}

export default Estimation
