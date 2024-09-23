import React, { useEffect, useState } from 'react'
import { Box, TextField, IconButton, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { criteriaDictionary, CriteriaType } from '../../../../../../config/criterias'
import { Criteria } from '../../../../../../model/types'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const SuggestionBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  pointerEvents: 'none',
  color: theme.palette.text.disabled,
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  padding: theme.spacing(1.5),
}))

const getTextCriteriaTypes = (text: string): CriteriaType[] | undefined => {
  const firstWord = (text.split(' ')[0] || '').trim().toLowerCase()
  const typeMapping: Record<string, CriteriaType[]> = {
    given: ['given'],
    when: ['when'],
    then: ['then'],
    and: ['given', 'then'],
  }
  return typeMapping[firstWord]
}

const getSuggestion = (text: string): string => {
  const firstWord = (text.split(' ')[0] || '').trim()
  const suggestions = criteriaDictionary
    .filter((s) => {
      const types = getTextCriteriaTypes(text)
      if (typeof types === 'undefined') return false
      return types.some((type) => s.types.includes(type))
    })
    .filter((s) => {
      const expected = text.split(' ').slice(1).join(' ')
      return s.text.startsWith(expected)
    })

  return suggestions.length > 0 ? firstWord + ' ' + suggestions[0].text : text
}

const getCurrentLine = (lines: string[], position: number): number => {
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

const CriteriaView: React.FC<Props> = ({ id, title, gherkin, onChange, onDelete }) => {
  const [criteriaData, setCriteriaData] = useState<Criteria>({
    id,
    title,
    gherkin,
  })
  const [suggestion, setSuggestion] = useState<string>('')

  useEffect(() => {
    updateGherkin(criteriaData.gherkin.length, criteriaData.gherkin)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent default to avoid new line
      setCriteriaData({ ...criteriaData, gherkin: suggestion })
      onChange({ ...criteriaData, gherkin: suggestion })
    }
  }

  const updateGherkin = (selectionStart: number, text: string) => {
    const lines = text.split('\n')
    const currentLine = getCurrentLine(lines, selectionStart)
    const sugg = getSuggestion(lines[currentLine])
    setSuggestion(lines.map((line, index) => (index === currentLine ? sugg : line)).join('\n'))
    setCriteriaData({ ...criteriaData, gherkin: text })
    onChange({ ...criteriaData, gherkin: text })
  }

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setCriteriaData({ ...criteriaData, title: newTitle })
    onChange({ ...criteriaData, title: newTitle })
  }

  return (
    <StyledPaper elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          fullWidth
          value={criteriaData.title}
          placeholder="Titre du critère"
          onChange={updateTitle}
          variant="outlined"
          size="small"
        />
        <IconButton onClick={() => onDelete(criteriaData.id)} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box position="relative">
        <SuggestionBox>{suggestion}</SuggestionBox>
        <TextField
          fullWidth
          multiline
          placeholder="GIVEN WHEN THEN"
          value={criteriaData.gherkin}
          onChange={(e) => updateGherkin(e.target.selectionStart || 0, e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
        />
      </Box>
    </StyledPaper>
  )
}

export default CriteriaView
