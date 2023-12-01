import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Map from "../default/components/Map";
import { TimelineType, getTimeline } from "utils/service";
import { setDeviceId } from "utils/redux";
import Widget from "components/widget/Widget";
import { MdDashboard, MdDevicesOther, MdMap } from "react-icons/md";
import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card";

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
      {/* <Widget
        icon={<MdDashboard className="h-6 w-6" />}
        title="Device"
        subtitle={deviceId}
      />
      <MiniCalendar /> */}
      <Card extra={"p-3 "}>
        <div className="bg-light  dark:bg-dark flex rounded-lg p-3">
          <span className="flex items-center text-brand-500 dark:text-white">
            <MdMap className="h-12 w-12" />
          </span>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              Device:{" "}
            </p>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {deviceId}
            </h4>
          </div>
        </div>
      </Card>
      <div className="flex flex-1 items-center justify-end space-x-4 p-4">
        <Map timeline={timeline} />
      </div>
    </div>
  );
};

export default Tables;
