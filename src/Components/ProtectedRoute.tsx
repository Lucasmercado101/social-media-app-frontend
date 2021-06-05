import { useEffect } from "react";
import { Route, useHistory, RouteProps } from "react-router-dom";
import { isLoggedIn } from "../api";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      isLoggedIn().catch(() => {
        localStorage.setItem("isAuthenticated", "false");
        history.push("/login");
      });
    } else {
      history.push("/login");
    }
  }, []);

  return <Route {...props} />;
};

export default ProtectedRoute;
