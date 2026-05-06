import { createApp, initialState, reducer, localData } from "./store/index.js";
import { render } from "./render/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { logger, persist, thunk } from "./middleware/index.js";

const startValue = localData.loadData() || initialState;
const app = createApp(startValue, reducer, [logger, persist, thunk]);

let prevState;
app.subscribe(() => {
  const state = app.getState();
  if (state.present.entities === null) {
    render.initialUI(state);
  } else if (prevState !== state) {
    render.renderAll(state);
  }
  prevState = state;
});

setupHandlers(app);
