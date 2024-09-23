import React, { useContext } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  marginTop: theme.spacing(2),
}));

const getValueItems = () => {
  const items = [
    <MenuItem key={"value_item_none"} value={0}>
      - Choisissez
    </MenuItem>,
  ];
  for (let i = 5; i <= 100; i += 5) {
    items.push(
      <MenuItem key={"value_item_" + i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
};

const BusinessValuePhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Valeur métier
          </Typography>
          <StyledFormControl fullWidth>
            <InputLabel id="business-value-label">Valeur métier</InputLabel>
            <Select
              labelId="business-value-label"
              id="user_story_business_value"
              value={story.value}
              label="Valeur métier"
              onChange={(e) =>
                setStory({
                  ...story,
                  value: parseInt(e.target.value as string),
                })
              }
            >
              {getValueItems()}
            </Select>
          </StyledFormControl>
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Objectif
          </Typography>
          <Typography variant="body1">
            La valeur métier aide à prioriser les US à réaliser. Elle permet
            aussi d'identifier quelles sont les fonctionnalités qui apportent
            beaucoup de valeur à nos utilisateurs.
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default BusinessValuePhase;
