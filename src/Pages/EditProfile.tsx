import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box,
  Avatar,
  TextField,
  Button,
  InputAdornment
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { editProfileMachine } from "./editProfileMachine";
import { useMachine } from "@xstate/react";
import { getMyUserData } from "../api";
import { useQuery } from "react-query";

function EditProfile() {
  const { data } = useQuery("my user data", getMyUserData);
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });
  const history = useHistory();
  const [state, send] = useMachine(editProfileMachine);
  const { username } = state.context;

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

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
      <Box component="form" onSubmit={handleSubmit} m={2}>
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
          {state.matches({ username: "default" }) && (
            <>
              <div>
                <Box clone color="text.secondary">
                  <Typography>Username:</Typography>
                </Box>
                <Typography>Johnathan Doughie</Typography>
              </div>
              <IconButton
                onClick={() => send({ type: "start_editing_username" })}
                size="small"
              >
                <EditIcon />
              </IconButton>
            </>
          )}
          {state.matches({ username: "editing" }) && (
            <Box clone width={1}>
              <TextField
                name="username"
                variant="outlined"
                placeholder="Johnathan Doughie"
                label="Username"
                autoFocus
                value={username}
                onChange={(e) =>
                  send({ type: "edited_username", value: e.target.value })
                }
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={() => send({ type: "stop_editing_username" })}
                      position="end"
                    >
                      <CloseIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          )}
        </Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Box clone color="error.main" borderColor="error.main">
            <Button variant="outlined" type="submit">
              Cancel
            </Button>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default EditProfile;
