import { MdBarChart, MdDevices, MdDevicesOther } from "react-icons/md";

import Widget from "components/widget/Widget";
import { useEffect, useState } from "react";
import { DataType, getDevices } from "utils/service";
import ComplexTable from "views/admin/default/components/ComplexTable";

const Dashboard = () => {
  const [devices, setDevices] = useState<[DataType]>([
    {
      deviceId: "",
      deviceName: "",
    },
  ]);

  const fetchAllDevices = async () => {
    try {
      const data: [DataType] = await getDevices();
      setDevices(data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchAllDevices();
  }, []);

  return (
    <div className="flex-">
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdDevices className="h-8 w-8" />}
          title={"Total Devices"}
          subtitle={devices.length.toString() || "0"}
        />
        {/* <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        {/* <div>
          <CheckTable tableData={tableDataCheck} />
        </div> */}

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

        {/* Complex Table , Task & Calendar */}

        <ComplexTable tableData={devices} />

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
