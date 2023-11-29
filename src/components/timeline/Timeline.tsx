import React from "react";

interface TimelineProps {
  deviceId: string;
}

const Timeline: React.FC<TimelineProps> = ({ deviceId }) => {
  return <div>{deviceId}</div>;
};

export default Timeline;
