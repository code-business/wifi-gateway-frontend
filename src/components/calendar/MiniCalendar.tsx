import "assets/css/MiniCalendar.css";
import Card from "components/card";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCalendar } from "utils/redux";

interface CalendarProps {
  func?: (value: string) => void;
}

const MiniCalendar: React.FC<CalendarProps> = ({ func }) => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    func(value.toISOString());
    dispatch(setCalendar());
  }, [value]);

  return (
    <div>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
