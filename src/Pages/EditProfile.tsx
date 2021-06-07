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
  InputAdornment,
  CircularProgress
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { editProfileMachine } from "./editProfileMachine";
import { useMachine } from "@xstate/react";
import { getMyUserData, myUserData, updateMyUserData } from "../api";
import { useQuery } from "react-query";

function EditProfile() {
  const { data, isLoading } = useQuery("my user data", getMyUserData, {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
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
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">Edit profile</Typography>
        </Toolbar>
      </AppBar>
      {isLoading && (
        <Box display="flex" mt={4} justifyContent="center">
          <CircularProgress size={75} />
        </Box>
      )}
      {data && <Form userData={data} />}
    </div>
  );
}

const Form = ({ userData }: { userData: myUserData }) => {
  const history = useHistory();
  const [state, send] = useMachine(editProfileMachine, {
    context: {
      initialFirstName: userData.firstName,
      initialLastName: userData.lastName
    }
  });

  const { firstName, initialFirstName, lastName, initialLastName } =
    state.context;

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    updateMyUserData({ firstName, lastName });
  };

  return (
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
        {state.matches({ firstName: "default" }) && (
          <>
            <div>
              <Box clone color="text.secondary">
                <Typography>First name:</Typography>
              </Box>
              <Typography>{initialFirstName}</Typography>
            </div>
            <IconButton
              onClick={() => send({ type: "start_editing_first_name" })}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </>
        )}
        {state.matches({ firstName: "editing" }) && (
          <Box clone width={1}>
            <TextField
              variant="outlined"
              placeholder={initialFirstName}
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) =>
                send({ type: "edited_first_name", value: e.target.value })
              }
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    style={{ cursor: "pointer" }}
                    onClick={() => send({ type: "stop_editing_first_name" })}
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
          <Button
            onClick={() =>
              history.length > 1
                ? history.goBack()
                : history.push("/home/profile")
            }
            variant="outlined"
            type="button"
          >
            Cancel
          </Button>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
