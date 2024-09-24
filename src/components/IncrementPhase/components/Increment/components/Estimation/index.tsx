import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  estimation: number;
  incrementTypeName: string;
  onChange: (estimation: number) => void;
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: 120,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  whiteSpace: "nowrap",
}));

const copySlackPollToClipboard = (incrementName: string) => {
  const pollText =
    '/poll "Estimation of ' +
    incrementName +
    '" ' +
    '" for a complexity of 0.5" :pinching_hand: ' +
    '" for a complexity of 1" :one: ' +
    '" for a complexity of 2" :two: ' +
    '" for a complexity of 3" :three: ' +
    '" for a complexity of 5" :five: ' +
    '" for a complexity of 8" :eight: ' +
    '" for a complexity of 13" :cold_sweat: ' +
    '" for a complexity of 21" :scream: limit 1';
  navigator.clipboard.writeText(pollText);
};

const Estimation = ({ estimation, incrementTypeName, onChange }: Props) => {
  const [slackCopied, setSlackCopied] = useState(false);

  const handleSlackCopy = () => {
    setSlackCopied(true);
    copySlackPollToClipboard(incrementTypeName);
  };

  useEffect(() => {
    if (slackCopied) {
      const timeout = setTimeout(() => {
        setSlackCopied(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [slackCopied]);

  return (
    <StyledBox>
      <Typography>Estimation</Typography>
      <StyledSelect
        value={estimation}
        onChange={(e) => onChange(parseFloat(e.target.value as string))}
      >
        <MenuItem value={0}>- Choisissez</MenuItem>
        <MenuItem value={0.5}>0.5</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={21}>21</MenuItem>
      </StyledSelect>
      <Tooltip title="Copier le poll Slack">
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faSlack} />}
          onClick={handleSlackCopy}
        >
          Poll
        </StyledButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={slackCopied}
        onClose={() => setSlackCopied(false)}
        message="Copié !"
        autoHideDuration={5000}
      />
    </StyledBox>
  );
};

export default Estimation;
