import { createApp, initialState, reducer } from "./store/index.js";
import { render } from "./render/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { logger, persist, thunk } from "./middleware/index.js";

const startValue = initialState;
const app = createApp(startValue, reducer, [logger, persist, thunk]);

let prevState;
app.subscribe(() => {
  const state = app.getState();
  if (state.present.entities === null) {
    console.log("entities === nul");
    render.initialUI(state);
  } else if (prevState !== state) {
    console.log("entities === state");
    render.renderAll(state);
  }
  prevState = state;
});

setupHandlers(app);
