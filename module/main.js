import { createApp, initialState, reducer } from "./store/index.js";
import { render } from "./render/index.js";
import { setupHandlers } from "./handlers/handlers.js";
import { logger, persist, thunk } from "./middleware/index.js";

const app = createApp(initialState, reducer, [logger, persist]);

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

app.dispatch(async (dispatch) => {
  const rest = await fetch("/api/data");
  const data = await res.json();
  dispatch({ type: "addRow", payload: data });
});

setupHandlers(app);
