import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceId } from "../../utils/redux";

interface Device {
  deviceName: string;
  deviceId: string;
}

interface AllDevicesProps {
  data: Device[];
  onClick: (id: string) => void;
}

const PAGE_SIZE = 10;

const AllDevices: React.FC<AllDevicesProps> = ({ data, onClick }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handleActionClick = (deviceId: string) => {
    dispatch(setDeviceId(deviceId));
    onClick(deviceId);
  };

  return (
    <div className="mt-8">
      <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="border bg-gray-100 p-3">Device Name</th>
            <th className="border bg-gray-100 p-3">Device ID</th>
            <th className="border bg-gray-100 p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((device, index) => (
            <tr key={index}>
              <td className="border p-3 text-center text-lg">
                {device.deviceName}
              </td>
              <td className="border p-3 text-center text-lg">
                {device.deviceId}
              </td>
              <td className="border p-3 text-center text-lg">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                  onClick={() => handleActionClick(device.deviceId)}
                >
                  Timeline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition duration-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(data.length / PAGE_SIZE))
              )
            }
            disabled={currentPage === Math.ceil(data.length / PAGE_SIZE)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDevices;
