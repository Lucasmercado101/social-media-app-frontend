import { Route, Redirect, Switch } from "react-router-dom";
import Feed from "../Components/Feed";

function Home() {
  return (
    <div>
      <Switch>
        <Route path={"/home"} exact component={Feed} />
        {/* <Route path={`/home/explore`} exact component={Feed} /> */}
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default Home;
