import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

function EditProfile() {
  const { register } = useForm();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });
  const history = useHistory();

  return (
    <div>
      <AppBar elevation={scrolled ? 4 : 0}>
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
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Edit profile</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default EditProfile;
