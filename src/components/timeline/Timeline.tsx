import React, { useEffect, useState } from "react";
import { TimelineType, getTimeline } from "../../utils/service";

interface TimelineProps {
  deviceId: string;
}

const Timeline: React.FC<TimelineProps> = ({ deviceId }) => {
  const [timeline, setTimeline] = useState<[TimelineType]>([
    {
      lat: "",
      lon: "",
      timestamp: 0,
      steps: "",
    },
  ]);

  const fetchDeviceTimeline = async (deviceId: string) => {
    try {
      const data: [TimelineType] = await getTimeline(deviceId);
      console.log({ data });
      setTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deviceId && fetchDeviceTimeline(deviceId);
  }, [deviceId]);

  useEffect(() => {
    console.log({ timeline });
  }, [timeline]);

  return <div>{timeline.toString()}</div>;
};

export default Timeline;
