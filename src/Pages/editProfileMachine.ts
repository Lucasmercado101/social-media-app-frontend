import { Machine, assign } from "xstate";

interface context {
  username: string;
  initialUsername: string;
}

const usernameStates = {
  id: "username field",
  initial: "default",
  states: {
    default: {
      on: {
        start_editing_username: "editing"
      }
    },
    editing: {
      on: {
        edited_username: {
          target: "editing",
          actions: "editedUsername"
        }
      }
    }
  },
  on: {
    stop_editing_username: {
      target: ".default",
      actions: "emptyUsername"
    }
  }
};

export const editProfileMachine = Machine<context>(
  {
    id: "register machine",
    type: "parallel",
    context: {
      username: "",
      initialUsername: ""
    },
    states: {
      username: usernameStates
    }
  },
  {
    actions: {
      editedUsername: assign({ username: (_, e) => e.value }),
      emptyUsername: assign({ username: (_) => "" })
    }
  }
);
