import React, { useState } from 'react'
import { criteriaDictionary as Suggestions } from '../../../../../../config/criterias'
import { Criteria } from '../../../../../../model/types'
import styles from './styles.module.scss'

type Props = {
  id: string
  title: string
  gherkin: string
  onChange: (criteria: Criteria) => void
  onDelete: (criteriaId: string) => void
}

const getSuggestion = (text: string) => {
  if (!text) return ''
  const suggestions = Suggestions.filter((s) => {
    return s.startsWith(text)
  })
  return suggestions[0] || text
}

const getCurrentLine: (lines: string[], position: number) => number = (lines, position) => {
  let i = 0
  let charCount = lines[i].length
  while (charCount < position && i !== lines.length - 1) {
    charCount += lines[++i].length + 1
  }
  return i
}

const CriteriaView = ({ id, title, gherkin, onChange, onDelete }: Props) => {
  const [criteriaData, setCriteriaData] = useState<Criteria>({
    id: id,
    title: title,
    gherkin: gherkin,
  })
  const [suggestion, setSuggestion] = useState<string>('')
  const [criteriaLineCount, setCriteriaLineCount] = useState(1)

  const handleKeyPressed = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.which !== 13) {
      return
    }
    setCriteriaData({ ...criteriaData, ['gherkin']: suggestion })
    onChange({ ...criteriaData, ['gherkin']: suggestion })
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
    setCriteriaData({ ...criteriaData, ['gherkin']: text })
    onChange({ ...criteriaData, ['gherkin']: text })
  }

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCriteriaData({ ...criteriaData, ['title']: event.target.value })
    onChange({ ...criteriaData, ['title']: event.target.value })
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
            Supprimer
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
