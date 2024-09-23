import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Checklist } from "../../../../../../model/types";

type Props = {
  checklist: Checklist;
  onChange: (checklist: Checklist) => void;
};

const defaultChecklist: Checklist = {
  d: false,
  i: false,
  e: false,
  t: false,
};

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  "& .MuiTypography-root": {
    fontWeight: "bold",
  },
}));

const ChecklistView = ({ checklist = defaultChecklist, onChange }: Props) => {
  const [data, setData] = useState({
    d: checklist.d,
    i: checklist.i,
    e: checklist.e,
    t: checklist.t,
  });

  const updateItem = (field: keyof Checklist, value: boolean) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onChange(newData);
  };

  return (
    <Box>
      <StyledFormGroup>
        {(["d", "i", "e", "t"] as const).map((item) => (
          <StyledFormControlLabel
            key={item}
            control={
              <Checkbox
                checked={data[item]}
                onChange={(e) => updateItem(item, e.target.checked)}
                name={`user_story_increment_diet_${item}`}
              />
            }
            label={item.toUpperCase()}
          />
        ))}
      </StyledFormGroup>
    </Box>
  );
};

export default ChecklistView;
