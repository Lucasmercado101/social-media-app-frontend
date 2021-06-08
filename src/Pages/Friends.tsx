import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

function Friends() {
  const history = useHistory();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

  return (
    <div>
      <AppBar position="sticky" elevation={scrolled ? 4 : 0}>
        <Toolbar>
          <Box clone mr={1}>
            <IconButton
              onClick={() =>
                history.length > 1
                  ? history.goBack()
                  : history.push("/home/profile")
              }
              edge="start"
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Friends</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Friends;
