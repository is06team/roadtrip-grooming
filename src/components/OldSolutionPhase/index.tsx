import React, { useContext } from "react";
import { Box, Typography, TextField, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const OldSolutionPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
              Solution fonctionnelle
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Comment répond-on au besoin ?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              name="solution"
              value={story.solution}
              id="user_story_solution"
              onChange={(e) => setStory({ ...story, solution: e.target.value })}
              margin="normal"
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Objectif
            </Typography>
            <Typography variant="body1">
              Se mettre d'accord sur la solution et la challenger
            </Typography>
            <Typography variant="h5" gutterBottom>
              Exemple
            </Typography>
            <Typography variant="body1">
              "Formulaire de contact qui envoie un mail"
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OldSolutionPhase;
