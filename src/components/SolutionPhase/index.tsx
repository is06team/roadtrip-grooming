import React, { useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlobalUserStoryContext } from "../../model/context";
import { Solution } from "../../model/types";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  marginLeft: theme.spacing(2),
}));

const getEstimationSelector = (
  estimation: number,
  onChange: (value: number) => void
) => (
  <StyledFormControl>
    <InputLabel>Complexité</InputLabel>
    <Select
      value={estimation}
      onChange={(e) => onChange(Number(e.target.value))}
      label="Complexité"
    >
      <MenuItem value={0}>- Complexité</MenuItem>
      <MenuItem value={1}>Faible</MenuItem>
      <MenuItem value={2}>Moyenne</MenuItem>
      <MenuItem value={3}>Forte</MenuItem>
    </Select>
  </StyledFormControl>
);

const incrementSolutions = (
  solutions: Solution[],
  currentlyUpdatedIndex: number
) =>
  typeof solutions[currentlyUpdatedIndex + 1] === "undefined"
    ? [...solutions, { text: "", estimation: 0, selected: false }]
    : solutions;

const getSelectedSolutionIndex = (solutions: Solution[]): string => {
  const selected = solutions.findIndex((solution) => solution.selected);
  return selected !== -1 ? selected.toString() : "";
};

const SolutionPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext);

  const handleChangeSolutionText = (index: number, text: string) => {
    const updatedSolutions = story.solutions.map((solution, i) =>
      i === index ? { ...solution, text } : solution
    );
    const incrementedSolutions = incrementSolutions(updatedSolutions, index);
    setStory({ ...story, solutions: incrementedSolutions });
  };

  const handleChangeSolutionEstimation = (
    index: number,
    estimation: number
  ) => {
    const updatedSolutions = story.solutions.map((solution, i) =>
      i === index ? { ...solution, estimation } : solution
    );
    setStory({ ...story, solutions: updatedSolutions });
  };

  const handleChangeSelectedSolution = (index: number) => {
    const updatedSolutions = story.solutions.map((solution, i) => ({
      ...solution,
      selected: i === index,
    }));
    setStory({ ...story, solutions: updatedSolutions });
  };

  if (!story.solutions) {
    story.solutions = [{ text: "", estimation: 0, selected: false }];
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Box sx={{ flexGrow: 1, flexBasis: "calc(66% - 1.5rem)" }}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
              Solution fonctionnelle
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Comment répond-on au besoin ?
            </Typography>
            <Typography variant="body1" paragraph>
              Listez ici des solutions potentielles pour répondre au besoin.
              Éventuellement, pour vous aider à choisir la bonne solution,
              estimez à la (grosse) louche leur complexité.
            </Typography>
            {story.solutions.map((solution, index) => (
              <Box
                key={`solution_${index}`}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {index + 1}.
                </Typography>
                <TextField
                  fullWidth
                  value={solution.text}
                  onChange={(e) =>
                    handleChangeSolutionText(index, e.target.value)
                  }
                />
                {getEstimationSelector(solution.estimation, (value) =>
                  handleChangeSolutionEstimation(index, value)
                )}
              </Box>
            ))}
            <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
              Puis choisissez laquelle sera réalisée.
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Solution choisie</InputLabel>
              <Select
                value={getSelectedSolutionIndex(story.solutions)}
                onChange={(e) =>
                  handleChangeSelectedSolution(Number(e.target.value))
                }
                label="Solution choisie"
              >
                <MenuItem value="">- Choisissez</MenuItem>
                {story.solutions
                  .filter((solution) => solution.text !== "")
                  .map((solution, index) => (
                    <MenuItem key={`option_${index}`} value={index}>
                      {index + 1}. {solution.text}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </StyledPaper>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: "calc(33% - 1.5rem)" }}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Objectif
            </Typography>
            <Typography variant="body1" paragraph>
              Se mettre d'accord sur la solution
            </Typography>
            <Typography variant="h5" gutterBottom>
              Exemple
            </Typography>
            <Typography variant="body1">
              "Formulaire de contact qui envoie un mail"
            </Typography>
          </StyledPaper>
        </Box>
      </Box>
    </Box>
  );
};

export default SolutionPhase;
