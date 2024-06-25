import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

interface IProps {
  isLoading: boolean;
  depth: number;
  count: number;
  handleDepthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DepthInput = ({ isLoading, depth, count, handleDepthChange }: IProps) => {
  return (
    <>
      <Stack direction="row">
        <TextField
          disabled={isLoading}
          aria-label="Enter depth for the search"
          placeholder="Choose depth"
          label="Depth of search"
          type="number"
          value={depth}
          onChange={handleDepthChange}
          id="tour-depth-input"
        />
        <div
          style={{
            marginTop: "1rem",
            marginLeft: "1rem",
            color: "#4f4c4c",
          }}
        >
          <Typography id="users-slider" fontSize={14} gutterBottom>
            {`Searching ${count} users using depth of ${depth}`}
          </Typography>
        </div>
      </Stack>
    </>
  );
};

export default DepthInput;
