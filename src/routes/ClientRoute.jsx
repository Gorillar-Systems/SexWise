/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import LoadingToRedirect from "./LoadingToRedirect";

const ClientRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return (user && user?.role === "client") || user?.role === "professional" ? (
    <div>{children}</div>
  ) : (
    <LoadingToRedirect to="/auth/login" message="You are not logged in." />
  );
};

export default ClientRoute;
