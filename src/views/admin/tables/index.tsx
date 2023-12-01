import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Map from "../default/components/Map";
import { TimelineType, getTimeline } from "utils/service";
import { setDeviceId } from "utils/redux";
import Widget from "components/widget/Widget";
import {
  MdCalendarToday,
  MdDashboard,
  MdDevicesOther,
  MdMap,
} from "react-icons/md";
import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card";

interface TimelineProps {
  deviceId: string;
}

const Tables: React.FC = () => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state: TimelineProps) => state.deviceId);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());

  const [timeline, setTimeline] = useState<[TimelineType]>([
    {
      lat: "",
      lon: "",
      timestamp: 0,
      steps: "",
    },
  ]);

  const fetchDeviceTimeline = async (deviceId: string, date: string) => {
    try {
      const data: [TimelineType] = await getTimeline(deviceId, date);
      dispatch(setDeviceId(deviceId));
      setTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = async (value: any) => {
    setDate(value);
  };

  useEffect(() => {
    deviceId.length > 0 && date && fetchDeviceTimeline(deviceId, date);
  }, [deviceId, date]);

  return (
    <div className="relative flex h-screen flex-col p-2">
      <Card extra={"p-3"}>
        <div className="bg-light dark:bg-dark  flex justify-between rounded-lg p-3">
          <div className="flex">
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
          {/* <MiniCalendar /> */}
          <button
            onClick={() => setCalendar(!calendar)}
            className="flex items-center gap-4"
          >
            <span className="text-xl font-bold text-navy-700 dark:text-white">
              {new Date(date).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <MdCalendarToday className="h-10 w-10 text-brand-500 dark:text-white" />
          </button>
        </div>
      </Card>
      {calendar && (
        <div className="absolute right-72 top-4  z-10">
          <MiniCalendar func={handleDateChange} />
        </div>
      )}
      <div className="flex flex-1 items-center justify-end space-x-4 p-4">
        {timeline.length > 1 ? (
          <Map timeline={timeline} />
        ) : (
          <div className="flex h-full w-full items-start justify-center pt-10 text-5xl text-gray-500 dark:text-gray-400">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
