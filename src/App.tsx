import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
