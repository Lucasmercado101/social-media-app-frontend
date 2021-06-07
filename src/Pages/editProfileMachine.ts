import { Machine, assign } from "xstate";
import { updateMyUserData } from "../api";

interface context {
  firstName: string;
  initialFirstName: string;
  lastName: string;
  initialLastName: string;
  image: File | null;
  initialImage: string;
  error: string;
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

const lastNameStates = {
  id: "last name field",
  initial: "default",
  states: {
    default: {
      on: {
        start_editing_last_name: "editing"
      }
    },
    editing: {
      on: {
        edited_last_name: {
          target: "editing",
          actions: "editedLastName"
        }
      }
    }
  },
  on: {
    stop_editing_last_name: {
      target: ".default",
      actions: "emptyLastName"
    }
  }
};

const imageStates = {
  id: "image",
  initial: "default",
  states: {
    default: {},
    uploaded_image: {}
  },
  on: {
    upload_image: [
      {
        target: ".uploaded_image",
        actions: "setUploadedImage",
        cond: "uploadedAnImage"
      },
      {
        target: ".uploaded_image",
        cond: "thereIsAnImageUploaded"
      }
    ]
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
      initialLastName: "",
      error: "",
      image: null,
      initialImage: ""
    },
    states: {
      firstName: firstNameStates,
      lastName: lastNameStates,
      image: imageStates,
      updatingProfile: {
        id: "updating status",
        initial: "idle",
        states: {
          idle: {
            on: {
              submit: "updating"
            }
          },
          updating: {
            invoke: {
              src: ({ firstName, lastName }) =>
                updateMyUserData({
                  firstName,
                  lastName,
                  profilePictureURL: null
                }),
              onDone: { actions: "onDone" },
              onError: {
                target: "error",
                actions: assign({
                  error: (_, event) => {
                    const err = event.data;
                    if (err.response) {
                      if (err.response.data) return err.response.data;
                      // client received an error response (5xx, 4xx)
                      return `Server error: ${err.response.status}`;
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
          error: {}
        }
      }
    }
  },
  {
    actions: {
      editedFirstName: assign({ firstName: (_, e) => e.value }),
      emptyFirstName: assign({ firstName: (_) => "" }),
      editedLastName: assign({ lastName: (_, e) => e.value }),
      emptyLastName: assign({ lastName: (_) => "" }),
      setUploadedImage: assign({ image: (_, e) => e.data })
    },
    guards: {
      uploadedAnImage: (_, e) => !!e.data,
      thereIsAnImageUploaded: (ctx) => !!ctx.image
    }
  }
);
