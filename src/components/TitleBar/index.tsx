import React, { useContext } from 'react'
import { AppBar, Toolbar, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/material'
import { GlobalUserStoryContext } from '../../model/context'
import TimerView from './components/Timer'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  '& .MuiInputBase-input': {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.primary.light,
    opacity: 0.7,
  },
}))

const TitleBar = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const handleChangeJiraTicket = (ticketNumber: string) => {
    const number = ticketNumber.replace('LBCFTRT-', '')
    setStory({ ...story, jiraTicket: 'LBCFTRT-' + number })
  }

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <StyledTextField
            value={story.title}
            id="user_story_title"
            label="Titre de la US"
            variant="outlined"
            size="small"
            sx={{ width: '65%' }}
            onChange={(e) => setStory({ ...story, title: e.target.value })}
          />
          <StyledTextField
            value={story.jiraTicket}
            label="Ticket JIRA"
            variant="outlined"
            size="small"
            sx={{ width: '35%' }}
            onChange={(e) => handleChangeJiraTicket(e.target.value)}
          />
        </Box>
        <TimerView />
      </Toolbar>
    </StyledAppBar>
  )
}

export default TitleBar
