import { Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <div>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
