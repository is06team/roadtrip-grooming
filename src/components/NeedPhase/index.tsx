import React, { useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const NeedPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  const handleChange = (field: string, value: string) => {
    setStory({
      ...story,
      need: {
        ...story.need,
        [field]: value,
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Quel est le besoin à groomer ?
          </Typography>
          <StyledTextField
            fullWidth
            label="En tant que"
            value={story.need.as}
            placeholder="Persona"
            onChange={(e) => handleChange("as", e.target.value)}
            helperText="(Qui)"
          />
          <StyledTextField
            fullWidth
            label="Je souhaite"
            value={story.need.want}
            placeholder="Ceci"
            onChange={(e) => handleChange("want", e.target.value)}
            helperText="(Quoi)"
          />
          <StyledTextField
            fullWidth
            label="Afin de"
            value={story.need.to}
            placeholder="Finalité"
            onChange={(e) => handleChange("to", e.target.value)}
            helperText="(Pourquoi)"
          />
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Déroulement
          </Typography>
          <Typography variant="body1" paragraph>
            Le PO explique le besoin de l'utilisateur.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Objectifs
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Cerner le vrai besoin univoque de l'utilisateur (le quoi et le qui)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Donner du sens à ce qu'on fait (le pourquoi)" />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom>
            Conseil
          </Typography>
          <Typography variant="body1">
            L'équipe essaye d'écrire un besoin le plus petit possible
            fonctionnellement.
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default NeedPhase;
