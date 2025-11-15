import { getActivties, getAnalytics, getInternaluser, getPayments, getState, getUser } from "../api/authApi";
import useSWR from "swr";

export const useStates = () => {
  const fetcher = getState;

  const { data, error } = useSWR("/api/auth/get-state", fetcher, {
    revalidateOnFocus: false,
  });

  return { states: data, isLoading: !data && !error, error };
};
export const useActivites = () => {
  const fetcher = getActivties;

  const { data, error } = useSWR("/api/admin/get-activties", fetcher, {
    revalidateOnFocus: false,
  });

  return { activites: data, isLoading: !data && !error, error };
};
export const usePayments = () => {
  const fetcher = getPayments;

  const { data, error } = useSWR("/api/admin/get-payments", fetcher, {
    revalidateOnFocus: false,
  });

  return { payments: data, isLoading: !data && !error, error };
};
export const useAnalytics = () => {
  const fetcher = getAnalytics;

  const { data, error } = useSWR("/api/admin/get-Analytics", fetcher, {
    revalidateOnFocus: false,
  });

  return { anlytics: data, isLoading: !data && !error, error };
};
export const useInternalUser = () => {
  const fetcher = getInternaluser;

  const { data, error } = useSWR("/api/admin/get-all-internal-user", fetcher, {
    revalidateOnFocus: false,
  });

  return { internalUser: data, isLoading: !data && !error, error };
};
export const useUser = () => {
  const fetcher = getUser;

  const { data, error } = useSWR("/api/admin/get-all-user", fetcher, {
    revalidateOnFocus: false,
  });

  return { user: data, isLoading: !data && !error, error };
};

