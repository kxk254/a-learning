const board = document.querySelector("#board");

let middlewares = [mwA, mwB, mwC];
let text = "";

function mwA(api) {
  return function (next) {
    return function (action) {
      next(action);
      return (text += action.type + api.dispatch);
    };
  };
}
function mwB(api) {
  return function (next) {
    return function (action) {
      next(action);
      return (text += action.type + api.dispatch);
    };
  };
}
function mwC(api) {
  return function (next) {
    return function (action) {
      next(action);
      return (text += action.type + api.dispatch);
    };
  };
}
function reducer(action) {
  console.log("reducer and action", action);
  return (text += action.type);
}

const api = { dispatch: () => dispatch() };

const dispatch = middlewares
  .map((mw) => mw(api))
  .reduceRight((next, mw) => mw(next), reducer);

dispatch({ type: "TEST_ACTION" });

board.textContent = text;
