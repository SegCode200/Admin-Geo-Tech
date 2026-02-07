import axios from "axios";
import { LandRegistration } from "../types/types";

const API_URL = "https://geo-tech-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getAllLands = async (): Promise<{ lands: LandRegistration[] } | any> => {
  return await api.get("/admin/get-all-lands").then((res) => res.data).catch((error) => {
    throw error.response?.data || error;
  });
};

export const getLandById = async (id: string): Promise<{ land: LandRegistration } | any> => {
  return await api.get(`/lands/get-land-info-byID/${id}`).then((res) => res.data).catch((error) => {
    throw error.response?.data || error;
  });
};

export const approveUserLand = async (landId: string) => {
  return await api.get(`/admin/approve-user-land/${landId}`).then((res) => res.data).catch((error) => {
    throw error.response?.data || error;
  });
};

export const rejectUserLand = async (landId: string) => {
  return await api.get(`admin/reject-user-land/${landId}`).then((res) => res.data).catch((error) => {
    throw error.response?.data || error;
  });
};
