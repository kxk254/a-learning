import { createApp, initialState, reducer } from "./store/index.js";
import { render } from "./render/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { logger, persist, thunk } from "./middleware/index.js";

const app = createApp(initialState, reducer, [logger, persist, thunk]);

let prevState;
app.subscribe(() => {
  const state = app.getState();
  if (prevState !== state) {
    render.renderAll(state);
  }
  prevState = state;
});

render.initialUI(app.getState());

setupHandlers(app);
