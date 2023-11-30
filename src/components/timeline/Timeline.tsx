import React, { useEffect, useState } from "react";
import { TimelineType, getTimeline } from "../../utils/service";
import Map from "../map/Map";

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

  return (
    <>
      <div
        style={{
          borderColor: "red",
          borderWidth: "2px",
          height: "100%",
          width: "100%",
        }}
      >
        <Map timeline={timeline} />
      </div>
    </>
  );
};

export default Timeline;
