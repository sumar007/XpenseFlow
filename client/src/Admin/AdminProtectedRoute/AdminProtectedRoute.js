import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (token && role === "Admin") {
      navigate("/adminpannel");
    } else {
      navigate("/adminlogin");
    }
  }, [navigate]);

  return children;
};

export default AdminProtectedRoute;

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
