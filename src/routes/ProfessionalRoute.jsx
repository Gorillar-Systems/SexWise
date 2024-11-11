/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import LoadingToRedirect from "./LoadingToRedirect";

const ProfessionalRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user?.role === "professional" ? (
    <div>{children}</div>
  ) : (
    <LoadingToRedirect
      to="/auth/professional/login"
      message="You are not logged in as a professional."
    />
  );
};

export default ProfessionalRoute;
