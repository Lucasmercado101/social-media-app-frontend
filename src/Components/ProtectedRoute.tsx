import { useEffect } from "react";
import { Route, useHistory, RouteProps, useLocation } from "react-router-dom";
import { isLoggedIn } from "../api";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      isLoggedIn().catch(() => {
        localStorage.setItem("isAuthenticated", "false");
        history.push("/login");
      });
    } else {
      history.push("/login");
    }
  }, [history, location.pathname]);

  return <Route {...props} />;
};

export default ProtectedRoute;
