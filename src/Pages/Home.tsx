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

type locationAsNumberFn = (location: string) => number;
const locationAsNumber = function (currentLocation) {
  switch (currentLocation) {
    case "home":
      return 0;
    case "explore":
      return 1;
    case "profile":
    default:
      return 2;
  }
} as locationAsNumberFn;

function Home() {
  const history = useHistory();

  const pathnames = history.location.pathname.split("/");
  const location = pathnames[pathnames.length - 1];

  const [navigationValue, setNavigationValue] = useState(() =>
    locationAsNumber(location)
  );

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
