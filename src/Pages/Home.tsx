import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Route, Redirect, Switch } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Feed from "../Components/Feed";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

function Home() {
  const [navigationValue, setNavigationValue] = useState(0);

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
        <BottomNavigationAction label="Feed" icon={<HomeIcon />} />
        <BottomNavigationAction label="Explore" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default Home;
