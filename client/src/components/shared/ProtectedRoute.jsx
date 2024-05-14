import { useNavigate } from "react-router-dom";
import { useUser } from "../../backend/hooks/useUser";
import { useEffect } from "react";
import Loader from "../UI/Loader";

const ProtectedRoute = ({ children }) => {
  // 1. load the authenticated user
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      // 2. Redirect to the login page if the user is not authenticated and loading has finished
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading)
    return (
      <main className="flex h-screen items-center justify-center">
        <Loader />
      </main>
    );

  // 4 if user exist , render the application
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
