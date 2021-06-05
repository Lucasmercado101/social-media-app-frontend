import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Route, Redirect, Switch } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Feed from "../Components/Feed";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";

function Home() {
  const [navigationValue, setNavigationValue] = useState(0);
  const history = useHistory();

  return (
    <div>
      <Switch>
        <Route path={"/home"} exact component={Feed} />
        {/* <Route path={`/home/explore`} exact component={Feed} /> */}
        <Redirect to="/home" />
      </Switch>
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
            if (history.location.pathname !== "/explore")
              history.push("/explore");
          }}
          label="Explore"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            if (history.location.pathname !== "/profile")
              history.push("/profile");
          }}
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default Home;
