import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";

const defaultSeconds = 300;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  width: "20%",
}));

const format = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const formattedSeconds = s < 10 ? "0" + s : s;
  return `${m}:${formattedSeconds}`;
};

const TimerView: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  const [active, setActive] = useState<boolean>(false);

  const startPause = () => {
    setActive((active) => !active);
  };

  const reset = () => {
    setActive(false);
    setSeconds(defaultSeconds);
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds <= 1) {
            clearInterval(interval);
            setActive(false);
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [active]);

  const progressValue = 100 - (seconds / defaultSeconds) * 100;

  return (
    <StyledBox flexDirection="column" justifyContent="center">
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={startPause} size="small">
          {active ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>{" "}
        <Typography variant="body2">{format(seconds)}</Typography>
        <IconButton onClick={reset} size="small">
          <ReplayIcon />
        </IconButton>
      </Box>
      <Box width="100%">
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{ height: 4 }}
        />
      </Box>
    </StyledBox>
  );
};

export default TimerView;
