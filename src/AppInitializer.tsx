import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { refreshUser } from "./global/authActions";
import { RouterProvider } from "react-router-dom";
import mainRoute from "./router/mainRoute";

const AppInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return <RouterProvider router={mainRoute} />;
};

export default AppInitializer;
