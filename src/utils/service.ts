import customAxios from "./axiosConfig";

export interface DataType {
  deviceId: string;
  deviceName: string;
}
export const getDevices = async () => {
  const data: { data: [DataType] } = await customAxios.get("/devices");
  return data.data;
};

export interface TimelineType {
  lat: string;
  lon: string;
  timestamp: number;
  steps: string;
}

export const getTimeline = async (deviceId: string, date: string) => {
  const data = await customAxios.get(`/timeline/${deviceId}/${date}`);
  return data;
};

export const findDevices = async (input: string) => {
  const data = await customAxios.post("/devices/find", { input });
  return data;
};
