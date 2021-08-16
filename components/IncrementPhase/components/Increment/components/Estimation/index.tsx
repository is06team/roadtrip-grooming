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
  let pollText = '/poll "Estimation of ' + incrementName + '" '
  pollText += '"for a complexity of 0.5" '
  pollText += '"for a complexity of 1" '
  pollText += '"for a complexity of 2" '
  pollText += '"for a complexity of 3" '
  pollText += '"for a complexity of 5" '
  pollText += '"for a complexity of 8" '
  pollText += '"for a complexity of 13" '
  pollText += '"for a complexity of 21" '
  pollText += ' limit 1'
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
        <span className="label">{slackCopied ? 'Copié !' : 'Copier poll Slack'}</span>
      </button>
    </div>
  )
}

export default Estimation
