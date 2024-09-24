import React, { useContext } from "react";
import { Box, Typography, TextField, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const EnablerPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Enablers
          </Typography>
          <Typography variant="h6" gutterBottom>
            Liste des enablers à créer pour rendre cette US groomable
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            name="enablers"
            value={story.enablers}
            id="user_story_enablers"
            onChange={(e) => setStory({ ...story, enablers: e.target.value })}
            variant="outlined"
            margin="normal"
          />
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Enablers ?
          </Typography>
          <Typography variant="body1">
            Il peut s'agir de maquettes, de faisabilité technique (pour aider à
            estimer)
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default EnablerPhase;
