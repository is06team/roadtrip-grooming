import React, { useContext } from "react";
import { Tab, Tabs, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Increment, Need, Solution } from "../../model/types";
import { GlobalUserStoryContext } from "../../model/context";

type Props = {
  currentPhase: string;
  onChangePhase: (phase: string) => void;
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 48,
  marginTop: theme.spacing(10),
  "& .MuiTab-root": {
    minHeight: 48,
    textTransform: "none",
  },
}));

const RecapText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
}));

const menuItems = [
  { name: "need", title: "Besoin", hasRecap: true },
  { name: "kpis", title: "KPIs de succès", hasRecap: true },
  { name: "value", title: "Valeur métier", hasRecap: true },
  { name: "solutions", title: "Solution fonctionnelle", hasRecap: true },
  { name: "enablers", title: "Enablers", hasRecap: true },
  { name: "assets", title: "Assets", hasRecap: true },
  { name: "increments", title: "Incréments", hasRecap: true },
  { name: "export", title: "Exporter", hasRecap: false },
];

const groomingItems = [
  { name: "assets", title: "Assets", hasRecap: true },
  { name: "increments", title: "Incréments", hasRecap: true },
];

const getNeedRecapText = (need: Need) =>
  (need.as ? "<strong>ETQ</strong> " + need.as + "<br />" : "") +
  (need.want ? "<strong>JS</strong> " + need.want + "<br />" : "") +
  (need.to ? "<strong>AD</strong> " + need.to : "");

const getValueRecapText = (value: number) =>
  value === 0 ? "" : value.toString();

const getSolutionRecapText = (solutions: Solution[] = []) => {
  const selectedSolutions = solutions.filter((solution) => solution.selected);
  return selectedSolutions.length > 0 ? selectedSolutions[0].text : "";
};

const getEnablerRecapText = (enablers: string) =>
  enablers
    .split("\n")
    .map((item) => item)
    .join("<br />");

const getIncrementRecapText = (increments: Increment[]) => {
  return increments.reduce((text, increment) => {
    const checklistText =
      (increment.checklist.d ? "D" : "-") +
      (increment.checklist.i ? "I" : "-") +
      (increment.checklist.e ? "E" : "-") +
      (increment.checklist.t ? "T" : "-");
    return (
      text +
      increment.type +
      " : " +
      checklistText +
      ", CP: " +
      increment.estimation +
      "<br />"
    );
  }, "");
};

const getRecap = (itemName: string, itemData: any) => {
  const recapText = (() => {
    switch (itemName) {
      case "need":
        return getNeedRecapText(itemData as Need);
      case "value":
        return getValueRecapText(itemData as number);
      case "solutions":
        return getSolutionRecapText(itemData as Solution[]);
      case "enablers":
        return getEnablerRecapText(itemData as string);
      case "increments":
        return getIncrementRecapText(itemData as Increment[]);
      default:
        return itemData as string;
    }
  })();

  return <RecapText dangerouslySetInnerHTML={{ __html: recapText }} />;
};
const Menu = ({ currentPhase, onChangePhase }: Props) => {
  const { story } = useContext(GlobalUserStoryContext);

  return (
    <StyledTabs
      value={currentPhase}
      onChange={(_, newValue) => onChangePhase(newValue)}
      variant="scrollable"
      scrollButtons="auto"
    >
      {menuItems.map((item) => (
        <Tab label={item.title} value={item.name} />
      ))}
    </StyledTabs>
  );
};

export default Menu;
