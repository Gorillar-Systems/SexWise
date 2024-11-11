import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfessionalLogin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "professional") navigate("/professional");
  }, [user]);
  return <div>ProfessionalLogin</div>;
};

export default ProfessionalLogin;
