import { Machine, assign } from "xstate";
import { logIn } from "../api";

interface context {
  error: string;
}

export const loginMachine = Machine<context>({
  id: "register-machine",
  context: {
    error: ""
  },
  initial: "idle",
  states: {
    idle: {},
    loggingIn: {
      invoke: {
        src: (_, e) => logIn(e.data),
        onDone: {
          target: "logged"
        },
        onError: {
          target: "error",
          actions: assign({
            error: (_, event) => {
              const err = event.data;
              if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status === 404)
                  return `Incorrect user or password`;
                else return `Server error: ${err.response.status}`;
              } else if (err.request) {
                // client never received a response, or request never left
                return "Network error";
              } else {
                return `An unknown error ocurred`;
              }
            }
          })
        }
      }
    },
    logged: {
      type: "final",
      entry: "onDone"
    },
    error: {}
  },
  on: {
    log_in: "loggingIn"
  }
});
