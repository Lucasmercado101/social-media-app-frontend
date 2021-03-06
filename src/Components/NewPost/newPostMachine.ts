import { Machine, assign } from "xstate";

interface context {
  content: string;
}

export const newPostMachine = Machine<context>(
  {
    id: "new-post",
    initial: "idle",
    context: {
      content: ""
    },
    states: {
      idle: {
        on: {
          start_creating_new_post: "creating_new_post"
        }
      },
      creating_new_post: {
        entry: "emptyContent",
        on: {
          typed: {
            actions: "typedContent"
          },
          discard: "idle",
          done: "done"
        }
      },
      done: {
        entry: "onDone",
        always: "idle"
      }
    }
  },
  {
    actions: {
      typedContent: assign({ content: (_, e) => e.content }),
      emptyContent: assign((_) => ({ content: "" }))
    }
  }
);
