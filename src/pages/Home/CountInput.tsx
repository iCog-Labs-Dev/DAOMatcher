import valueText from "@/pages/Home/valueText";
import { Typography, Slider } from "@mui/material";

interface IProps {
  isLoading: boolean;
  count: number;
  handleChange: (e: Event, value: number | number[]) => void;
}

const CountInput = ({ isLoading, count, handleChange }: IProps) => {
  return (
    <>
      <div style={{ alignSelf: "left" }}>
        <Typography id="users-slider" gutterBottom>
          How many results?
        </Typography>
      </div>
      <Slider
        disabled={isLoading}
        aria-label="Temperature"
        getAriaValueText={valueText}
        valueLabelDisplay="auto"
        step={30}
        marks
        min={10}
        max={1000}
        aria-labelledby="users-slider"
        size="small"
        onChange={handleChange}
        value={count}
      />
    </>
  );
};

export default CountInput;
