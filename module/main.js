import { createApp, initialState, reducer } from "./store/index.js";
import { render } from "./render/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { logger, persist, thunk } from "./middleware/index.js";

const app = createApp(initialState, reducer, [logger, persist, thunk]);

render.initialUI(app.getState());

let prevState;
app.subscribe(() => {
  const state = app.getState();
  console.log("prevState -->", prevState);
  if (prevState === undefined) {
    console.log("entities === null");
    render.initialUI(state);
  } else if (prevState !== state) {
    console.log("entities === state");
    render.renderAll(state);
  }
  prevState = state;
});

setupHandlers(app);
