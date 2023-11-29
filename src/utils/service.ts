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

export const getTimeline = async (deviceId: string) => {
  const data: { data: [TimelineType] } = await customAxios.get(
    `/timeline/${deviceId}`
  );
  return data.data;
};
