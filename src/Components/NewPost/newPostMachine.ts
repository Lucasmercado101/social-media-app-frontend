import { Machine } from "xstate";

export const newPostMachine = Machine({
  id: "new-post",
  initial: "idle",
  states: {
    idle: {}
  }
});
