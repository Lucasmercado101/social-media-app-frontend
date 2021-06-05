import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { registerMachine } from "./registerMachine";
import { useMachine } from "@xstate/react";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/featured/?friends)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorAlert: { width: "100%", marginTop: 15 },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [state, send] = useMachine(registerMachine, {
    actions: {
      onDone: () => history.replace("/login")
    }
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Collapse in={state.matches("error")} className={classes.errorAlert}>
            <Alert severity="error">{state.context.error}</Alert>
          </Collapse>
          <form
            onSubmit={handleSubmit((values) =>
              send({ type: "register", data: values })
            )}
            className={classes.form}
            noValidate
          >
            <TextField
              {...register("username")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              {...register("password")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={state.matches("registering")}
            >
              Register
              {state.matches("registering") && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
