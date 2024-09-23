import React, { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { GlobalUserStoryContext } from "../../model/context";
import { Increment, IncrementType } from "../../model/types";
import IncrementView from "./components/Increment";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const IncrementPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  const addIncrement = () => {
    const increments = story.increments;
    setStory({
      ...story,
      increments: [
        ...increments,
        {
          id: uuidv4(),
          type: IncrementType.none,
          estimation: 0,
          checklist: { d: false, i: false, e: false, t: false },
          notes: "",
          dependencies: "",
          criterias: [],
        },
      ],
    });
  };

  const updateIncrement = (id: string, value: Increment) => {
    setStory({
      ...story,
      increments: story.increments.map((increment) =>
        increment.id !== id ? increment : value
      ),
    });
  };

  const deleteIncrement = (incrementId: string) => {
    setStory({
      ...story,
      increments: story.increments.filter(({ id }) => id !== incrementId),
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Incréments de la US
          </Typography>
          <Box id="user_story_increments">
            {story.increments.map((increment) => (
              <IncrementView
                key={increment.id}
                id={increment.id}
                type={increment.type}
                estimation={increment.estimation}
                checklist={increment.checklist}
                criterias={increment.criterias}
                notes={increment.notes}
                dependencies={increment.dependencies}
                onChange={(value) => updateIncrement(increment.id, value)}
                onDelete={(id) => deleteIncrement(id)}
              />
            ))}
          </Box>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={addIncrement}
          >
            Ajouter un incrément dans cette US
          </StyledButton>
        </StyledPaper>
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Points de vigilance
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Plusieurs clics</strong> sur les{" "}
                    <strong>boutons</strong> de soumission de formulaire
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Cas d'erreur</strong> ou indisponibilité des{" "}
                    <strong>services tiers</strong>
                  </>
                }
              />
            </ListItem>
          </List>
          <Typography variant="h5" gutterBottom>
            DIET
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>D</strong>écoupé au maximum : est-ce que l'incrément
                    n'est plus découpable davantage ?
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>I</strong>ndépendant : d'un autre incrément, d'une
                    autre US ou d'assets
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>E</strong>stimable : si l'équipe est en mesure
                    d'estimer l'incrément
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>T</strong>estable : si tous les critères ont été
                    écrits pour cet incrément
                  </>
                }
              />
            </ListItem>
          </List>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default IncrementPhase;
