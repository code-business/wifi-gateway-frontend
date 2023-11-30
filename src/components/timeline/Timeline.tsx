import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimelineType, getTimeline } from "../../utils/service";
import Map from "../map/Map";
import { setDeviceId } from "../../utils/redux";

interface TimelineProps {
  deviceId: string;
}

const Timeline: React.FC<TimelineProps> = ({ deviceId }) => {
  const dispatch = useDispatch();
  const [timeline, setTimeline] = useState<[TimelineType]>([
    {
      lat: "",
      lon: "",
      timestamp: 0,
      steps: "",
    },
  ]);
  const deviceInStore = useSelector((state: TimelineProps) => state.deviceId);
  const fetchDeviceTimeline = async (deviceId: string) => {
    try {
      const data: [TimelineType] = await getTimeline(deviceId);
      dispatch(setDeviceId(deviceId));
      setTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deviceId.length === 0) {
      deviceInStore && fetchDeviceTimeline(deviceInStore);
    } else if (timeline[0]?.lat.length === 0) {
      fetchDeviceTimeline(deviceId);
    }
  }, []);

  return (
    <>
      <div
        style={{
          borderColor: "blue",
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
