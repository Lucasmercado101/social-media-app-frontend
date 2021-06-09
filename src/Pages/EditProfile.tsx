import { useRef } from "react";
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
  CircularProgress,
  Collapse
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { editProfileMachine } from "./editProfileMachine";
import { useMachine } from "@xstate/react";
import { getMyUserData, userData } from "../api";
import { useQuery } from "react-query";
import { Alert } from "@material-ui/lab";

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

const Form = ({ userData }: { userData: userData }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [state, send] = useMachine(editProfileMachine, {
    context: {
      initialFirstName: userData.firstName,
      initialLastName: userData.lastName,
      initialImage: userData.profilePictureURL
    },
    actions: {
      onDone: () => history.replace("/home/profile")
    }
  });

  const {
    firstName,
    initialFirstName,
    lastName,
    initialLastName,
    error,
    image,
    initialImage
  } = state.context;

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    send({ type: "submit" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e!.target!.files!.length) {
      const file = e!.target!.files![0];
      e.target.value = "";
      send({ type: "upload_image", data: file });
    }
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
            <Box clone display="none">
              <input
                onChange={handleImageUpload}
                ref={imageInputRef}
                type="file"
                accept="image/*"
              />
            </Box>
            <Avatar
              onClick={() => imageInputRef.current?.click()}
              style={{
                maxHeight: 200,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
              }}
              src={
                state.matches({ image: "uploaded_image" })
                  ? URL.createObjectURL(image)
                  : initialImage
              }
            >
              <AddAPhotoIcon style={{ width: "50%", height: "50%" }} />
            </Avatar>
          </div>
        </Box>
      </div>
      <Collapse in={state.matches({ image: "uploaded_image" })}>
        <Box mt={2} display="flex" justifyContent="center">
          <Box clone color="error.main" borderColor="error.main">
            <Button onClick={() => send("remove_image")} variant="outlined">
              Remove Image
            </Button>
          </Box>
        </Box>
      </Collapse>
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
              inputProps={{
                maxLength: 50
              }}
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
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {state.matches({ lastName: "default" }) && (
          <>
            <div>
              <Box clone color="text.secondary">
                <Typography>Last name:</Typography>
              </Box>
              <Typography>{initialLastName}</Typography>
            </div>
            <IconButton
              onClick={() => send({ type: "start_editing_last_name" })}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </>
        )}
        {state.matches({ lastName: "editing" }) && (
          <Box clone width={1}>
            <TextField
              variant="outlined"
              placeholder={initialLastName}
              label="Last Name"
              autoFocus
              value={lastName}
              onChange={(e) =>
                send({ type: "edited_last_name", value: e.target.value })
              }
              required={true}
              inputProps={{
                maxLength: 50
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    style={{ cursor: "pointer" }}
                    onClick={() => send({ type: "stop_editing_last_name" })}
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
      <Collapse in={state.matches({ updatingProfile: "error" })}>
        <Alert severity="error">{error}</Alert>
      </Collapse>
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
        <Button
          disabled={[
            { updatingProfile: { updating: "uploading_image" } },
            { updatingProfile: { updating: "uploading_all_data" } }
          ].some(state.matches)}
          type="submit"
          variant="contained"
          color="primary"
        >
          Confirm
          {[
            { updatingProfile: { updating: "uploading_image" } },
            { updatingProfile: { updating: "uploading_all_data" } }
          ].some(state.matches) && (
            <Box clone color="secondary.main">
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12
                }}
              />
            </Box>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
