import axios from "axios";

const API_URL = "https://geo-tech-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allow sending/receiving cookies
});

export const loginAdmin = async (data: { email: string; password: string }) => {
  const res = await api.post("/admin/admin-login", data);
  return res.data;
};

export const refreshSession = async () => {
  const res = await api.get("/admin/refresh");
  return res.data;
};
export const getState = async () => {
  const res = await api.get("/auth/get-state");
  return res.data;
};
export const getActivties = async () => {
  const res = await api.get("/admin/get-activties");
  return res.data;
};
export const getPayments = async () => {
  const res = await api.get("/admin/get-payments");
  return res.data;
};
export const getAnalytics = async () => {
  const res = await api.get("/admin/get-Analytics");
  return res.data;
};
export const getInternaluser = async () => {
  const res = await api.get("/admin/get-all-internal-user");
  return res.data;
};
export const getUser = async () => {
  const res = await api.get("/admin/get-all-user");
  return res.data;
};

export const logoutAdmin = async () => {
  await api.post("/auth/logout");
};

export const createInternalUser = async(data:{name:string,email:string, phone:string, ministry: string, department: string, approvingPosition: number, function:string, role: string, requiresSignature: boolean, stateId: string })=>{
    return await api.post("/internal-users/", data).catch((error) => {
    throw error.response?.data || error;
  });
}
