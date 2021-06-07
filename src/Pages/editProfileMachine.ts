import { Machine, assign } from "xstate";

interface context {
  firstName: string;
  initialFirstName: string;
  lastName: string;
  initialLastName: string;
}

const firstNameStates = {
  id: "first name field",
  initial: "default",
  states: {
    default: {
      on: {
        start_editing_first_name: "editing"
      }
    },
    editing: {
      on: {
        edited_first_name: {
          target: "editing",
          actions: "editedFirstName"
        }
      }
    }
  },
  on: {
    stop_editing_first_name: {
      target: ".default",
      actions: "emptyFirstName"
    }
  }
};

export const editProfileMachine = Machine<context>(
  {
    id: "register machine",
    type: "parallel",
    context: {
      firstName: "",
      initialFirstName: "",
      lastName: "",
      initialLastName: ""
    },
    states: {
      firstName: firstNameStates
    }
  },
  {
    actions: {
      editedFirstName: assign({ firstName: (_, e) => e.value }),
      emptyFirstName: assign({ firstName: (_) => "" })
    }
  }
);
