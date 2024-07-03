import React, { useState, useEffect } from "react";
import Joyride, { STATUS, ACTIONS, Step } from "react-joyride";

interface JoyrideTourProps {
  steps: Step[];
  tourKey: string;
}

const JoyrideTour: React.FC<JoyrideTourProps> = ({ steps, tourKey }) => {
  const [tourCompleted, setTourCompleted] = useState<boolean>(false);

  useEffect(() => {
    const isTourCompleted = localStorage.getItem(tourKey);
    if (isTourCompleted === "true") {
      setTourCompleted(true);
    }
  }, [tourKey]);

  const handleJoyrideCallback = (data: any) => {
    const { status, action } = data;
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
      action === ACTIONS.CLOSE
    ) {
      setTourCompleted(true);
      localStorage.setItem(tourKey, "true");
    }
  };

  return (
    !tourCompleted && (
      <Joyride
        steps={steps}
        continuous={true}
        styles={{
          options: {
            arrowColor: "#009688",
            backgroundColor: "#009688",
            overlayColor: "rgba(92, 174, 171, 0.3)",
            primaryColor: "#009688",
            textColor: "#fff",
            zIndex: 1000,
          },
          overlay: {
            height: "100vh",
            zIndex: 1000,
          },
          spotlight: {
            backgroundColor: "transparent",
            transition: "opacity 0.3s ease-in-out",
            pointerEvents: "none",
          },
          buttonClose: {
            display: "none",
          },
        }}
        showProgress={true}
        callback={handleJoyrideCallback}
        showSkipButton={true}
      />
    )
  );
};

export default JoyrideTour;
