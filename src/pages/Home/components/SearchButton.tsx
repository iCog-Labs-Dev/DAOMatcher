import { Button } from "@mui/material";

interface IProps {
  isLoading: boolean;
  handleSubmit: () => void;
}

const SearchButton = ({ isLoading, handleSubmit }: IProps) => {
  return (
    <>
      {!isLoading ? (
        <Button
          disabled={isLoading}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          size="small"
        >
          Search
        </Button>
      ) : null}
    </>
  );
};

export default SearchButton;
