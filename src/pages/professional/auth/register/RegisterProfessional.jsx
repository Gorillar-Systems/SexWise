import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterProfessional = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "professional") navigate("/professional");
  }, [user]);

  return <div>RegisterProfessional</div>;
};

export default RegisterProfessional;
