import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Props = {
  estimation: number
  incrementTypeName: string
  onChange: (estimation: number) => void
}

const copySlackPollToClipboard = (incrementName: string) => {
  const pollText =
    '/poll "Estimation of ' +
    incrementName +
    '" ' +
    '" for a complexity of 0.5" :pinching_hand: ' +
    '" for a complexity of 1" :one: ' +
    '" for a complexity of 2" :two: ' +
    '" for a complexity of 3" :three: ' +
    '" for a complexity of 5" :five: ' +
    '" for a complexity of 8" :eight: ' +
    '" for a complexity of 13" :cold_sweat: ' +
    '" for a complexity of 21" :scream: limit 1'
  navigator.clipboard.writeText(pollText)
}

const Estimation = ({ estimation, incrementTypeName, onChange }: Props) => {
  const [slackCopied, setSlackCopied] = useState(false)

  const handleSlackCopy = () => {
    setSlackCopied(true)
    copySlackPollToClipboard(incrementTypeName)
  }

  useEffect(() => {
    if (slackCopied) {
      const timeout = setTimeout(() => {
        setSlackCopied(false)
        clearTimeout(timeout)
      }, 5000)
    }
  }, [slackCopied])

  return (
    <div className={styles.Estimation}>
      <label>Estimation</label>
      <select
        className="medium user_story_increment_estimation"
        value={estimation}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      >
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
      <button className={'slackPoll' + (slackCopied ? ' copied' : '')} onClick={handleSlackCopy}>
        <FontAwesomeIcon icon={faSlack} />
        <span className="label">{slackCopied ? 'Copié !' : 'Poll Slack'}</span>
      </button>
    </div>
  )
}

export default Estimation
