import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Redirect to="login" />
      </Switch>
    </div>
  );
}

export default App;
