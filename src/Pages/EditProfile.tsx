import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box,
  Avatar,
  TextField,
  Button
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";

function EditProfile() {
  const { register } = useForm();
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });
  const history = useHistory();

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
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Edit profile</Typography>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <div style={{ maxHeight: 200 }}>
          <Box clone mx="auto">
            <div
              style={{
                width: "60%",
                maxWidth: 200,
                position: "relative",
                paddingTop: "60%"
              }}
            >
              <Avatar
                style={{
                  maxHeight: 200,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0
                }}
              >
                <AddAPhotoIcon style={{ width: "50%", height: "50%" }} />
              </Avatar>
            </div>
          </Box>
        </div>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Box clone color="text.secondary">
              <Typography>Username:</Typography>
            </Box>
            <Typography>Johnathan Doughie</Typography>
          </div>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Box clone color="error.main" borderColor="error.main">
            <Button
              onClick={() =>
                history.length > 1
                  ? history.goBack()
                  : history.push("/home/profile")
              }
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
          <Button variant="contained" color="primary">
            Confirm
          </Button>
        </Box>
      </Box>
      {/* <TextField variant="outlined" /> */}
    </div>
  );
}

export default EditProfile;
