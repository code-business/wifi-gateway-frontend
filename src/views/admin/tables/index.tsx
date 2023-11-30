import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Map from "../default/components/Map";
import { TimelineType, getTimeline } from "utils/service";
import { setDeviceId } from "utils/redux";
import Widget from "components/widget/Widget";
import { MdDashboard } from "react-icons/md";

interface TimelineProps {
  deviceId: string;
}

const Tables: React.FC = () => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state: TimelineProps) => state.deviceId);

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
      dispatch(setDeviceId(deviceId));
      setTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deviceId.length > 0 && fetchDeviceTimeline(deviceId);
  }, [deviceId]);

  return (
    <div className="flex h-screen flex-col p-2">
      <Widget
        icon={<MdDashboard className="h-6 w-6" />}
        title="Device"
        subtitle={deviceId}
      />
      <div className="flex flex-1 items-center justify-end space-x-4 p-4">
        <Map timeline={timeline} />
      </div>
    </div>
  );
};

export default Tables;
