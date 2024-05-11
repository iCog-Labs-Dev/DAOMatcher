import { LoadingButton } from "@mui/lab";

interface props {
  loading: boolean;
  fullWidth?: boolean;
  onClick: (e: any) => Promise<void | JSX.Element>;
  text: String;
}

const Button = ({
  loading = false,
  fullWidth = true,
  onClick,
  text,
}: props) => {
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      fullWidth={fullWidth}
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ margin: "24px 0 16px" }}
    >
      {text}
    </LoadingButton>
  );
};

export default Button;
