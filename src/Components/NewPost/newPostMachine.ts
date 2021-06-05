import { Machine } from "xstate";

export const newPostMachine = Machine({
  id: "new-post",
  initial: "idle",
  states: {
    idle: {
      on: {
        start_creating_new_post: "creating_new_post"
      }
    },
    creating_new_post: {}
  }
});
