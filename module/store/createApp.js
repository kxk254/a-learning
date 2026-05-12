export function createApp(initialState, reducer, middlewares = []) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    console.log("subscribe ::", listener);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function baseDispatch(action) {
    state = reducer(state, action);
    console.log("base dispatch ::", action, state);
    listeners.forEach((l) => l());
    return state;
  }
  const dispatch = middlewares
    .map((mw) => mw({ getState, dispatch: (a) => dispatch(a) }))
    .reduceRight((next, mw) => mw(next), baseDispatch);

  dispatch({ type: "@@init" });

  return { getState, dispatch, subscribe };
}
