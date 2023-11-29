import customAxios from "./axiosConfig";

interface DataType {
  deviceId: string;
  deviceName: string;
}
export const getDevices = async () => {
  const data: { data: [DataType] } = await customAxios.get("/devices");
  return data.data;
};
