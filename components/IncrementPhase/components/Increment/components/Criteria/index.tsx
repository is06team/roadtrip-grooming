import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { criteriaDictionary, CriteriaType } from '../../../../../../config/criterias'
import { Criteria } from '../../../../../../model/types'
import styles from './styles.module.scss'

const getTextCriteriaTypes: (text: string) => CriteriaType[] | undefined = (text) => {
  const firstWord = (text.split(' ')[0] || '').trim()
  const typeMapping: Record<string, CriteriaType[]> = {
    given: ['given'],
    when: ['when'],
    then: ['then'],
    and: ['given', 'then'],
  }
  return typeMapping[firstWord.toLowerCase()]
}

const getSuggestion = (text: string) => {
  const firstWord = (text.split(' ')[0] || '').trim()

  const suggestions = criteriaDictionary
    .filter((s) => {
      const types = getTextCriteriaTypes(text)
      if (typeof types === 'undefined') return false
      return types.reduce((previous, type) => {
        return previous || s.types.includes(type)
      }, false)
    })
    .filter((s) => {
      const expected = text
        .split(' ')
        .filter((value, index) => {
          return index !== 0
        })
        .join(' ')
      return s.text.startsWith(expected)
    })

  return suggestions.length > 0 ? firstWord + ' ' + suggestions[0].text : text
}

const getCurrentLine: (lines: string[], position: number) => number = (lines, position) => {
  let i = 0
  let charCount = lines[i].length
  while (charCount < position && i !== lines.length - 1) {
    charCount += lines[++i].length + 1
  }
  return i
}

interface Props {
  id: string
  title: string
  gherkin: string
  onChange: (criteria: Criteria) => void
  onDelete: (criteriaId: string) => void
}

const CriteriaView = ({ id, title, gherkin, onChange, onDelete }: Props) => {
  const [criteriaData, setCriteriaData] = useState<Criteria>({
    id: id,
    title: title,
    gherkin: gherkin,
  })
  const [suggestion, setSuggestion] = useState<string>('')
  const [criteriaLineCount, setCriteriaLineCount] = useState(1)

  useEffect(() => setCriteriaLineCount(criteriaData.gherkin.split('\n').length), [])

  const handleKeyPressed = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') {
      return
    }
    setCriteriaData({ ...criteriaData, gherkin: suggestion })
    onChange({ ...criteriaData, gherkin: suggestion })
  }

  const updateGherkin = (selectionStart: number, text: string) => {
    const lines = text.split('\n')
    setCriteriaLineCount(lines.length)
    const currentLine = getCurrentLine(lines, selectionStart)
    const sugg = getSuggestion(lines[currentLine])
    setSuggestion(
      lines
        .map((line, index) => {
          return index === currentLine ? sugg : line
        })
        .join('\n'),
    )
    setCriteriaData({ ...criteriaData, gherkin: text })
    onChange({ ...criteriaData, gherkin: text })
  }

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCriteriaData({ ...criteriaData, title: event.target.value })
    onChange({ ...criteriaData, title: event.target.value })
  }

  return (
    <div className="user_story_increment_criteria_item">
      <div className={styles.Criteria}>
        <div className={styles.title}>
          <input
            type="text"
            className="user_story_increment_criteria_title"
            value={criteriaData.title}
            placeholder="Titre du critère"
            onChange={(event) => updateTitle(event)}
          />
          <button className="criteriaTitle" onClick={() => onDelete(criteriaData.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.contentField} style={{ height: (criteriaLineCount + 2) * 1.25 + 'em' }}>
            <div className={styles.contentSuggestion}>{suggestion}</div>
            <textarea
              className="user_story_increment_criteria_text"
              placeholder="GIVEN WHEN THEN"
              value={criteriaData.gherkin}
              onChange={(e) => updateGherkin(e.target.selectionStart, e.target.value)}
              onKeyPress={(e) => handleKeyPressed(e)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriteriaView
