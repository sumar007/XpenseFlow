import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (token && role === "superadmin") {
      navigate("/superhome");
    } else {
      navigate("/superlogin");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;

// Check if the route is not found and redirect to "/notfound"
// useEffect(() => {
//   const unblock = navigate("/notfound", { replace: true });
//   return () => unblock();
// }, [navigate]);

// Check if the route is not found and redirect to "/notfound"
// useEffect(() => {
//   const unblock = navigate("/notfound", { replace: true });
//   return () => unblock();
// }, [navigate]);
