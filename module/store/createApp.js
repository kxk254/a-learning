export function createApp(initialState, reducer, middlewares = []) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.forEach((l) => l !== listener);
    };
  }

  const api = { getState: getState, dispatch: (action) => dispatch(action) };

  function baseDispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return state;
  }

  const dispatch = middlewares
    .map((mw) => mw(api))
    .reduceRight((next, mw) => mw(next), baseDispatch);

  dispatch({ type: "@@init" });

  return { getState, dispatch, subscribe };
}
