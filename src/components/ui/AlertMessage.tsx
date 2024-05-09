import { Alert } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";

interface IProps {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

const AlertMessage = ({ message, severity }: IProps) => {
  return (
    <Alert
      key={nanoid()}
      severity={severity}
      style={{ marginTop: "5px", marginBottom: "5px" }}
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
