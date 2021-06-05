import { Machine, assign } from "xstate";
import { register } from "../api";

interface context {
  error: string;
}

export const registerMachine = Machine<context>({
  id: "register-machine",
  context: {
    error: ""
  },
  initial: "idle",
  states: {
    idle: {},
    registering: {
      invoke: {
        src: (_, e) => register(e.data),
        onDone: {
          target: "registered"
        },
        onError: {
          target: "error",
          actions: assign({
            error: (_, event) => {
              const err = event.data;
              if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status === 409) return `User already exists`;
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
    registered: {
      type: "final",
      entry: "onDone"
    },
    error: {}
  },
  on: {
    register: "registering"
  }
});
