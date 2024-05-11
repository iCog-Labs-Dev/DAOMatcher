import { Link } from "react-router-dom";

interface LinkProp {
  text: string;
  to: string;
}

const OptionLink = ({ text, to }: LinkProp) => {
  return (
    <Link
      style={{
        color: "#1976d2",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
      }}
      to={to}
    >
      {text}
    </Link>
  );
};

export default OptionLink;
