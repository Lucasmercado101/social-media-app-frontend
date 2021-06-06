import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Route, Redirect, Switch } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Feed from "../Components/Feed";
import Explore from "../Components/Explore";
import Profile from "./Profile";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";

function Home() {
  const [navigationValue, setNavigationValue] = useState(0);
  const history = useHistory();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flexGrow: 1 }}>
        <Switch>
          <Route path={"/home"} exact component={Feed} />
          <Route path={"/home/explore"} exact component={Explore} />
          <Route path={"/home/profile"} exact component={Profile} />
          <Redirect to="/home" />
        </Switch>
      </div>
      <BottomNavigation
        value={navigationValue}
        onChange={(event, newValue) => {
          setNavigationValue(newValue);
        }}
        showLabels
        style={{ position: "sticky", bottom: 0 }}
      >
        <BottomNavigationAction
          onClick={() => {
            if (history.location.pathname !== "/home") history.push("/home");
          }}
          label="Feed"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            if (history.location.pathname !== "/home/explore")
              history.push("/home/explore");
          }}
          label="Explore"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            if (history.location.pathname !== "/home/profile")
              history.push("/home/profile");
          }}
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default Home;
