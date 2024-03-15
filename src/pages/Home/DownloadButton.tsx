import { IconButton } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

interface IProps {
  handleDownloadClick: () => void;
}

const DownloadButton = ({ handleDownloadClick }: IProps) => {
  return (
    <>
      <IconButton
        style={{ marginRight: "0.5rem" }}
        aria-label="Download results"
        size="medium"
        onClick={handleDownloadClick}
      >
        <DownloadRoundedIcon color="success" />
      </IconButton>
    </>
  );
};

export default DownloadButton;
