export function createApp(initialState, reducer, middlewares = []) {
  const state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listners = push.listener;
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function baseDispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l = l()));
    return state;
  }
  const dispatch = middlewares
    .map((mw) => ({ getState, dispatch: (a) => dispatch(a) }))
    .reduceRight((next, mw) => mw(nest), baseDispatch);

  return { getState, dispatch, subscribe };
}
