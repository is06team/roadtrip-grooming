import React, { useState } from 'react'
import { criteriaDictionary as Suggestions } from '../../../../../../../model/criterias'
import styles from './styles.module.scss'

const Criteria = ({ id, title, gherkin, onChange, onDelete }) => {

  const [data, setData] = useState({
    id: id,
    title: title,
    gherkin: gherkin,
  })

  const [suggestion, setSuggestion] = useState('')

  const getSuggestion = (text) => {
    if (!text) return '';
    const suggestions = Suggestions.filter((s) => {
      return s.startsWith(text)
    })
    return suggestions[0] || text
  }

  const getCurrentLine = (lines, position) => {
    let i = 0
    let charCount = lines[i].length
    while (charCount < position && i !== lines.length - 1) {
      charCount += lines[++i].length + 1
    }
    return i
  }

  const handleKeyPressed = (event) => {
    if (event.which !== 13) {
      return
    }
    setData({ ...data, ['gherkin']: suggestion })
    onChange({ ...data, ['gherkin']: suggestion })
  }

  const updateGherkin = (selectionStart, value) => {
    const lines = value.split('\n')
    const currentLine = getCurrentLine(lines, selectionStart)
    const sugg = getSuggestion(lines[currentLine])
    setSuggestion(
      lines.map((line, index) => {
        return (index === currentLine ? sugg : line)
      }).join('\n')
    )
    setData({ ...data, ['gherkin']: value })
    onChange({ ...data, ['gherkin']: value })
  }

  const updateTitle = (event) => {
    setData({ ...data, ['title']: event.target.value })
    onChange({ ...data, ['title']: event.target.value })
  }

  return (
    <div className="user_story_increment_criteria_item">
      <div className={styles.Criteria}>
        <div className={styles.title}>
          <input
            type="text"
            className="user_story_increment_criteria_title"
            value={data.title}
            placeholder="Titre du critère"
            onChange={updateTitle} />
          <button className="criteriaTitle" onClick={() => onDelete(data.id) }>Supprimer</button>
        </div>
        <div className={styles.content}>
          <div className={styles.contentField}>
            <div className={styles.contentSuggestion}>{suggestion}</div>
            <textarea
              className="user_story_increment_criteria_text"
              placeholder="GIVEN WHEN THEN"
              value={data.gherkin}
              onChange={(e) => updateGherkin(e.target.selectionStart, e.target.value)}
              onKeyPress={handleKeyPressed}></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Criteria
