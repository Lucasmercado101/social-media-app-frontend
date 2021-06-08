import { Machine, assign } from "xstate";
import { updateMyUserData, uploadImageToCloudinary } from "../api";

interface context {
  firstName: string;
  initialFirstName: string;
  lastName: string;
  initialLastName: string;
  image: File | null;
  imageUrl?: string;
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
    ],
    remove_image: {
      target: ".default",
      actions: "emptyImage"
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
      initialLastName: "",
      error: "",
      image: null,
      initialImage: "",
      imageUrl: undefined
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
            initial: "idle",
            states: {
              idle: {
                always: [
                  {
                    target: "uploading_image",
                    cond: "thereIsAnImageUploaded"
                  },
                  {
                    target: "uploading_all_data"
                  }
                ]
              },
              uploading_image: {
                invoke: {
                  src: ({ image }) => uploadImageToCloudinary(image),
                  onDone: {
                    actions: assign({ imageUrl: (_, e) => e.data.url }),
                    target: "uploading_all_data"
                  },
                  onError: {
                    target: "#updating status.error",
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
              uploading_all_data: {
                invoke: {
                  src: ({ firstName, lastName, imageUrl }) =>
                    updateMyUserData({
                      firstName,
                      lastName,
                      profilePictureURL: imageUrl ?? null
                    }),
                  onDone: { actions: "onDone" },
                  onError: {
                    target: "#updating status.error",
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
      setUploadedImage: assign({ image: (_, e) => e.data }),
      emptyImage: assign({ image: (_) => null })
    },
    guards: {
      uploadedAnImage: (_, e) => !!e.data,
      thereIsAnImageUploaded: (ctx) => !!ctx.image
    }
  }
);
