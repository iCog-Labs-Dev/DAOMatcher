import { Button } from "@mui/material";

interface IProps {
  isLoading: boolean;
  handleCancel: () => void;
}

const CancelButton = ({ isLoading, handleCancel }: IProps) => {
  return (
    <>
      {isLoading ? (
        <Button
          disabled={isLoading}
          variant="contained"
          fullWidth
          onClick={handleCancel}
          size="small"
        >
          Cancel
        </Button>
      ) : null}
    </>
  );
};

export default CancelButton;
