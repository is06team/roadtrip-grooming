import React, { useContext } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { saveAs } from "file-saver";
import slug from "slug";
import { GlobalUserStoryContext } from "../../../../model/context";
import { Criteria, Increment, Need, UserStory } from "../../../../model/types";

const projectKey = "LBCFTRT";
const projectName = "LBC FT Roadtrip";

const getNeedDescription = (need: Need) =>
  "h2. Besoin\n\n" +
  "*ETQ* " +
  need.as +
  "\n" +
  "*JS* " +
  need.want +
  "\n" +
  "*AD* " +
  need.to;

const getSolutionDescription = (solution: string) =>
  "h2. Solution fonctionnelle\n\n" + (solution || "Néant");

const getKpisDescription = (kpis: string) =>
  "h2. KPIs de succès\n\n" + (kpis || "Néant");

const getAssetsDescription = (assets: string) =>
  "h2. Assets\n\n" + (assets || "Néant");

const getMainDescription: (story: UserStory) => string = (story) =>
  getNeedDescription(story.need) +
  "\n\n" +
  getSolutionDescription(story.solution) +
  "\n\n" +
  getKpisDescription(story.kpis) +
  "\n\n" +
  getAssetsDescription(story.assets);

const getCriteriasDescription = (criterias: Criteria[]) =>
  criterias.map(
    (criteria) =>
      '{panel:title=""' +
      criteria.title.replaceAll('"', '""') +
      '""}\n' +
      criteria.gherkin.replaceAll('"', '""') +
      "\n" +
      "{panel}\n\n"
  );

const getStoryLine = (story: UserStory) => [
  projectKey,
  projectName,
  "Story",
  story.title,
  '"' + getMainDescription(story) + '"',
  story.value.toString(),
  "",
  "",
  "",
  "",
  "",
  "",
];

const getIncrementDescription = (story: UserStory, increment: Increment) =>
  '"' +
  getMainDescription(story) +
  "\n\n" +
  (increment.criterias.length > 0
    ? getCriteriasDescription(increment.criterias).join("")
    : "") +
  (increment.notes.trim().length > 0
    ? "h2. Notes\n\n" + increment.notes.trim()
    : "") +
  '"';

const getROI = (businessValue: number, estimation: number) =>
  estimation === 0 ? "0" : Math.round(businessValue / estimation).toString();

const getIncrementLine = (story: UserStory, increment: Increment) => [
  projectKey,
  projectName,
  "Story increment",
  story.title + " : " + increment.type.valueOf(),
  getIncrementDescription(story, increment),
  story.value.toString(),
  increment.estimation,
  getROI(story.value, increment.estimation),
  increment.checklist.d ? "D" : "",
  increment.checklist.i ? "I" : "",
  increment.checklist.e ? "E" : "",
  increment.checklist.t ? "T" : "",
  story.jiraTicket ? story.jiraTicket : "",
];

const getEnablers: (enablers: string) => string[] = (enablers) => {
  const items = enablers.split("\n");
  if (items.length === 1 && items[0] === "") {
    return [];
  }
  return items;
};

const getEnablerLine = (enabler: string) => [
  projectKey,
  projectName,
  "Enabler",
  enabler,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const getCsvExport: (story: UserStory) => string = (story) => {
  const headerLine =
    "Project Key,Project Name,Type,Summary,Description,Business Value,Estimation,ROI,DIET,DIET,DIET,DIET";
  const storyLine = getStoryLine(story);
  const incrementLines = story.increments.map((increment) =>
    getIncrementLine(story, increment)
  );
  const enablerLines = getEnablers(story.enablers).map((enabler) =>
    getEnablerLine(enabler)
  );

  return (
    headerLine +
    "\n" +
    storyLine.join(",") +
    "\n" +
    enablerLines.reduce((enablerLinesText, enablerLine) => {
      return enablerLinesText + enablerLine.join(",") + "\n";
    }, "") +
    incrementLines.reduce((incrementLinesText, incrementLine) => {
      return incrementLinesText + incrementLine.join(",") + "\n";
    }, "")
  );
};

const getUserStoryCsv: (story: UserStory) => string = (story) => {
  const headerLine =
    "Project Key,Project Name,Type,Summary,Description,Business Value,Estimation,ROI,DIET,DIET,DIET,DIET";
  const storyLine = getStoryLine(story);
  const enablerLines = getEnablers(story.enablers).map((enabler) =>
    getEnablerLine(enabler)
  );

  return (
    headerLine +
    "\n" +
    storyLine.join(",") +
    "\n" +
    enablerLines.reduce((enablerLinesText, enablerLine) => {
      return enablerLinesText + enablerLine.join(",") + "\n";
    }, "")
  );
};

const getIncrementCsv: (story: UserStory) => string = (story) => {
  const headerLine =
    "Project Key,Project Name,Type,Summary,Description,Business Value,Estimation,ROI,DIET,DIET,DIET,DIET,UserStoryLink";
  const incrementLines = story.increments.map((increment) =>
    getIncrementLine(story, increment)
  );

  return (
    headerLine +
    "\n" +
    incrementLines.reduce((incrementLinesText, incrementLine) => {
      return incrementLinesText + incrementLine.join(",") + "\n";
    }, "")
  );
};

const downloadUserStoryCsv = (story: UserStory) => {
  const blob = new Blob([getUserStoryCsv(story)], { type: "text/csv" });
  saveAs(blob, "UserStory-" + slug(story.title) + ".csv");
};

const downloadIncrementCsv = (story: UserStory) => {
  const blob = new Blob([getIncrementCsv(story)], { type: "text/csv" });
  saveAs(blob, "Increments-" + slug(story.title) + ".csv");
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledPre = styled("pre")(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflowX: "auto",
  maxHeight: "300px",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const JiraExport = () => {
  const { story } = useContext(GlobalUserStoryContext);

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Export CSV pour JIRA
      </Typography>
      <Typography variant="body1" paragraph>
        Vous pouvez importer les tickets JIRA avec le fichier CSV suivant :
      </Typography>
      <StyledPre>{getCsvExport(story)}</StyledPre>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => downloadUserStoryCsv(story)}
        >
          Télécharger US et enablers
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => downloadIncrementCsv(story)}
        >
          Télécharger incréments
        </Button>
      </ButtonContainer>
    </StyledPaper>
  );
};

export default JiraExport;
