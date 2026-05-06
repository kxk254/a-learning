import { reducer, initialState } from "./index.js";

export function createApp(initialState, reducer, middlewares = []) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function baseDispatch(action) {
    console.log("baseDispatch", action);
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return state;
  }
  const dispatch = middlewares
    .map((mw) => mw({ getState, dispatch: (a) => dispatch(a) }))
    .reduceRight((next, mw) => mw(next), baseDispatch);

  return { getState, dispatch, subscribe };
}
