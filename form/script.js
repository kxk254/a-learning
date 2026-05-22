import { createApp, reducer, initialState } from "./store/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { render } from "./render/index.js";
import { logger, persist, thunk } from "./middleware/index.js";

let middlewares = [logger, persist, thunk];
const app = createApp(initialState, reducer, middlewares);

let prevState;
app.subscribe(() => {
  state === app.getState();
  if (state !== prevState) {
    render.renderAll(state);
  }
  presState = state;
});

render.initialUI(app.getState());

setupHandlers(app);
