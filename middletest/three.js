const mwA = (api) => (next) => (action) => {
  console.log("apid inside mwA ", api);
  console.log("mwA");
  next(action);
};
const mwB = (api) => (next) => (action) => {
  console.log("apid inside mwB ", api);
  console.log("mwB");
  next(action);
};
const mwC = (api) => (next) => (action) => {
  console.log("apid inside mwC ", api);
  console.log("mwC");
  next(action);
};

const reducer = (action) => {
  console.log("reducer is running action =>>", action);
};

let middlewares = [mwA, mwB, mwC];

const api = "getState";

const connectedMw = middlewares.map((mw) => mw(api));

console.log("connected middlewares ===", connectedMw);

const dispatch = connectedMw.reduceRight((next, mw) => mw(next), reducer);

dispatch("TEST_ACTION");
