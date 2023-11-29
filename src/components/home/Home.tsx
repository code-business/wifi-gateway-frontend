import React, { useState } from "react";
import { useNavigate } from "react-router";
import AllDevices from "../allDevices/AllDevices";
import Settings from "../settings/Settings";
import Timeline from "../timeline/Timeline";

interface SidebarTabProps {
  tabName: string;
  selected: boolean;
  onClick: (tabName: string) => void;
  collapsed: boolean;
}

const SidebarTab: React.FC<SidebarTabProps> = ({
  tabName,
  selected,
  onClick,
  collapsed,
}) => (
  <div
    className={`cursor-pointer mb-4 text-2xl font-bold text-center mt-4 ${
      selected ? "bg-indigo-900 text-white" : ""
    }`}
    onClick={() => onClick(tabName)}
  >
    {collapsed ? tabName.charAt(0) : tabName}
  </div>
);

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("All Devices");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchAllDevices = async () => {};

  const handleSidebarClick = (tabName: string) => {
    console.log(`Clicked on ${tabName}`);
    if (tabName === "All Devices") {
      fetchAllDevices();
    }
    setSelectedTab(tabName);
  };

  const handleSearch = (searchTerm: string) => {
    console.log(`Searching for: ${searchTerm}`);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const logout = () => {
    navigate("/login");
  };

  const devices = [
    {
      _id: "65670229072cf7c935ff42df",
      deviceName: "Wifi Gateway Device",
      deviceId: "A4:CF:12:25:E2:30",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-48"
        } bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 transition-all duration-300 ease-in-out`}
      >
        <SidebarTab
          tabName="Timeline"
          selected={selectedTab === "Timeline"}
          onClick={handleSidebarClick}
          collapsed={sidebarCollapsed}
        />
        <SidebarTab
          tabName="All Devices"
          selected={selectedTab === "All Devices"}
          onClick={handleSidebarClick}
          collapsed={sidebarCollapsed}
        />
        <SidebarTab
          tabName="Settings"
          selected={selectedTab === "Settings"}
          onClick={handleSidebarClick}
          collapsed={sidebarCollapsed}
        />
        <SidebarTab
          tabName="Logout"
          selected={selectedTab === "Logout"}
          onClick={logout}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-4"
        style={{
          background: "linear-gradient(to bottom, #141e30, #243b55)",
        }}
      >
        {/* Navbar */}
        <div className="flex items-center justify-between mb-4">
          {/* Toggle Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="text-white cursor-pointer focus:outline-none"
          >
            {sidebarCollapsed ? ">>" : "<<"}
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold text-white">Your Logo</div>

          {/* Search input */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search device"
              className="border p-2 rounded focus:outline-none focus:border-blue-500 text-gray-800"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Sections */}
        <div>
          {selectedTab === "Timeline" ? (
            <Timeline />
          ) : selectedTab === "All Devices" ? (
            <AllDevices data={devices} />
          ) : (
            <Settings />
          )}
        </div>
        {/* Add your main content components here */}
      </div>
    </div>
  );
};

export default Home;
