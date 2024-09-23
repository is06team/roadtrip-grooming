import React, { useContext } from "react";
import { Box, Typography, TextField, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const KpiPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            KPI de succès
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            On aura eu raison de réaliser cette fonctionnalité si...
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            name="kpi"
            value={story.kpis}
            onChange={(e) => setStory({ ...story, kpis: e.target.value })}
            variant="outlined"
            margin="normal"
          />
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Objectif
          </Typography>
          <Typography variant="body1">
            Justifier l'utilité business de la fonctionnalité.
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default KpiPhase;
