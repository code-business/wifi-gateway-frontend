import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card";
import { MdCalendarToday, MdMap } from "react-icons/md";
import { setDeviceId } from "utils/redux";
import { TimelineType, getTimeline } from "utils/service";
import Map from "../default/components/Map";

interface TimelineProps {
  deviceId: string;
}

type RootState = {
  calendar: boolean;
};

const Tables: React.FC = () => {
  const deviceId = useSelector((state: TimelineProps) => state.deviceId);
  const calendar = useSelector((state: RootState) => state.calendar);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(null);

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
      const res = await getTimeline(deviceId, date);
      const data: [TimelineType] = res.data;
      setTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange: (value: any) => void = (value: any) => {
    const valueDate = new Date(value);
    const dateDate = new Date(date);
    if (valueDate.getTime() === dateDate.getTime()) {
      console.log("The value and date are the same.");
    } else {
      setDate(value);
      console.log("The value and date are different.");
    }
  };

  useEffect(() => {
    if (deviceId.length > 0 && date) {
      fetchDeviceTimeline(deviceId, date);
    }
  }, [deviceId, date]);

  useEffect(() => {
    setOpenCalendar(false);
  }, []);

  useEffect(() => {
    setOpenCalendar(calendar);
  }, [calendar]);

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
                {deviceId.length > 0 ? deviceId : "No Device Found"}
              </h4>
            </div>
          </div>

          <button
            onClick={() => setOpenCalendar(!openCalendar)}
            className="flex items-center gap-4"
          >
            <span className="text-xl font-bold text-navy-700 dark:text-white">
              {date
                ? new Date(date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Select Date from Calendar"}
            </span>
            <MdCalendarToday className="h-10 w-10 text-brand-500 dark:text-white" />
          </button>
        </div>
      </Card>
      {openCalendar && (
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
