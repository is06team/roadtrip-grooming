import { useContext, useState } from 'react'
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Button, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import JiraExport from './components/JiraExport'
import { GlobalUserStoryContext } from '../../model/context'
import { useImportFile } from '../../hooks/useImportFile'
import { useExportFile } from '../../hooks/useExportFile'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))

const FlexItem = styled(Box)(({ theme }) => ({
  flex: 1,
}))

const StyledPre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflowX: 'auto',
}))

const ExportImportPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)
  const { importFile, error } = useImportFile(setStory)
  const { getJsonExport, downloadJsonExport } = useExportFile()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Exporter
      </Typography>
      <Box flexDirection={'column'}>
        <FlexItem>
          <StyledPaper elevation={3}>
            <JiraExport />
          </StyledPaper>
        </FlexItem>
        <FlexItem>
          <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography>Vous recherchez l'ancienne manière d'importer ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5" gutterBottom>
                Export JSON
              </Typography>
              <Typography variant="body1" paragraph>
                La US n'est pas terminée ? Exportez au format JSON pour la réimporter dans cet outil dans un futur
                grooming et la terminer.
              </Typography>
              <StyledPre>{getJsonExport(story)}</StyledPre>
              <Box display={'flex'} gap={2}>
                <Button variant="contained" color="primary" onClick={() => downloadJsonExport(story)}>
                  Télécharger
                </Button>
                <label htmlFor="json_upload">
                  <input
                    id="json_upload"
                    type="file"
                    accept="application/json"
                    onChange={(e) => e.target.files && importFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  <Button variant="contained" component="span">
                    Importer un fichier
                  </Button>
                </label>
              </Box>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>
        </FlexItem>
      </Box>
    </Box>
  )
}

export default ExportImportPhase
