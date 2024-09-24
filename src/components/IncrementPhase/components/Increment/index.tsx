import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import {
  Checklist,
  Criteria,
  Increment,
  IncrementType,
} from "../../../../model/types";
import { incrementTypes } from "../../../../config/increments";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistView from "./components/Checklist";
import CriteriaView from "./components/Criteria";
import Estimation from "./components/Estimation";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

type Props = {
  id: string;
  type: IncrementType;
  estimation: number;
  checklist: Checklist;
  notes: string;
  criterias: Criteria[];
  dependencies: string;
  onChange: (increment: Increment) => void;
  onDelete: (incrementId: string) => void;
};

const IncrementView = ({
  id,
  type = IncrementType.none,
  estimation,
  checklist,
  notes,
  criterias,
  dependencies,
  onChange,
  onDelete,
}: Props) => {
  const [increment, setIncrement] = useState<Increment>({
    id,
    type,
    estimation,
    checklist,
    notes,
    criterias,
    dependencies,
  });

  const handleChangeIncrementData = (newData: Increment) => {
    setIncrement(newData);
    onChange(newData);
  };

  const getCurrentIncrementType = () =>
    incrementTypes.find(
      (incrementType) => incrementType.id === increment.type
    ) || null;

  const addCriteria = () => {
    const newCriterias = [
      ...increment.criterias,
      { id: uuidv4(), title: "", gherkin: "" },
    ];
    handleChangeIncrementData({ ...increment, criterias: newCriterias });
  };

  const updateCriteria = (id: string, value: Criteria) => {
    const newCriterias = increment.criterias.map((criteria) =>
      criteria.id === id ? value : criteria
    );
    handleChangeIncrementData({ ...increment, criterias: newCriterias });
  };

  const deleteCriteria = (criteriaId: string) => {
    const newCriterias = increment.criterias.filter(
      (criteria) => criteria.id !== criteriaId
    );
    handleChangeIncrementData({ ...increment, criterias: newCriterias });
  };

  const getCriterias = (criterias: Criteria[]) => {
    const currentIncrementType = getCurrentIncrementType();
    if (currentIncrementType?.hasCriterias) {
      return (
        <Box>
          <Typography variant="h6">Critères d'acceptation</Typography>
          <Box>
            {criterias.map((criteria) => (
              <CriteriaView
                key={criteria.id}
                id={criteria.id}
                title={criteria.title}
                gherkin={criteria.gherkin}
                onChange={(value) => updateCriteria(criteria.id, value)}
                onDelete={(id) => deleteCriteria(id)}
              />
            ))}
          </Box>
          <Box justifyContent="flex-end" display="flex">
            <Button variant="outlined" onClick={addCriteria}>
              Ajouter un critère dans cet incrément
            </Button>
          </Box>
        </Box>
      );
    }
    return null;
  };

  const updateNotes = (notes: string) => {
    handleChangeIncrementData({ ...increment, notes });
  };

  const getNotes = (notes: string) => {
    const currentIncrementType = getCurrentIncrementType();
    if (currentIncrementType?.hasNotes) {
      return (
        <Box>
          <Typography variant="h6">Notes</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Éléments à verifier pendant les tests"
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
          />
        </Box>
      );
    }
    return null;
  };

  const updateChecklist = (checklist: Checklist) => {
    handleChangeIncrementData({ ...increment, checklist });
  };

  const getSecondary = (estimation: number, checklist: Checklist) => {
    const currentIncrementType = getCurrentIncrementType();
    if (
      currentIncrementType &&
      (currentIncrementType.hasEstimation || currentIncrementType.hasDiet)
    ) {
      return (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          {currentIncrementType.hasDiet && (
            <ChecklistView checklist={checklist} onChange={updateChecklist} />
          )}
          {currentIncrementType.hasEstimation && (
            <Estimation
              estimation={estimation}
              incrementTypeName={type.valueOf()}
              onChange={(newEstimation) =>
                handleChangeIncrementData({
                  ...increment,
                  estimation: newEstimation,
                })
              }
            />
          )}
        </Box>
      );
    }
    return null;
  };

  const updateDependencies = (dependencies: string) => {
    handleChangeIncrementData({ ...increment, dependencies });
  };

  const getDependencies = () => {
    const currentIncrementType = getCurrentIncrementType();
    if (currentIncrementType?.hasDependencies) {
      return (
        <Box>
          <TextField
            fullWidth
            label="Dépendant de :"
            value={increment.dependencies}
            onChange={(e) => updateDependencies(e.target.value)}
          />
        </Box>
      );
    }
    return null;
  };

  const getTypeSelector = (currentType: IncrementType) => (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Type d'incrément</InputLabel>
      <Select
        value={currentType.valueOf()}
        label="Type d'incrément"
        onChange={(event) =>
          handleChangeIncrementData({
            ...increment,
            type: event.target.value as IncrementType,
          })
        }
      >
        {incrementTypes.map((type) => (
          <MenuItem value={type.id} key={"increment_type_" + type.id}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <StyledPaper elevation={3}>
      <HeaderBox>
        <Typography variant="h5">Incrément</Typography>
        {getTypeSelector(increment.type)}
        <IconButton onClick={() => onDelete(increment.id)}>
          <DeleteIcon />
        </IconButton>
      </HeaderBox>
      <Box>
        {getCriterias(increment.criterias)}
        {getNotes(increment.notes)}
      </Box>
      {getSecondary(increment.estimation, increment.checklist)}
      {getDependencies()}
    </StyledPaper>
  );
};

export default IncrementView;
