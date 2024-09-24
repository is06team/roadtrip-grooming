import React, { useContext } from "react";
import { Box, Typography, TextField, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const AssetPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Assets
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A-t-on tous les assets pour réaliser cette fonctionnalité ?
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Remarques (facultatif)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            name="assets"
            value={story.assets}
            id="user_story_assets"
            onChange={(e) => setStory({ ...story, assets: e.target.value })}
            variant="outlined"
            margin="normal"
          />
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Assets ?
          </Typography>
          <Typography variant="body1">
            Les assets sont les éléments (généralement images, son, vidéos...)
            qui agrémentent le visuel d'une fonctionnalité.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Maquettes suivant les plate-formes
          </Typography>
          <Typography variant="body1">
            Si il manque des maquettes dans une plate-forme ou un média
            (exemple: Mobile VS Desktop), il est possible de créer des
            incréments UI qui peuvent être réalisés dans un second temps.
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default AssetPhase;
