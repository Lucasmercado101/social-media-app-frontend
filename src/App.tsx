import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Redirect to="login" />
      </Switch>
    </div>
  );
}

export default App;
