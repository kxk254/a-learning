export function createApp(initialState, reducer, middlewares = []) {
  let state;
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

  let dispatch;
  const api = { getState, dispatch: (action) => dispatch(action) };

  function baseDispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return state;
  }
  const connectedMW = middlewares.map((mw) => mw(api));
  dispatch = connectedMW.reduceRight((next, mw) => mw(next), baseDispatch);

  dispatch({ type: "@@init" });

  return { getState, subscribe, dispatch };
}
