const mwA = (api) => (next) => (action) => {
  console.log("next", next, "action", action);
  next(action);
};
const mwB = (api) => (next) => (action) => {
  console.log("next", next, "action", action);
  next(action);
};
const mwC = (api) => (next) => (action) => {
  console.log("next", next, "action", action);
  next(action);
};

function reducer(action) {
  console.log("REDUCER--Action", action, " | ");
}

const api = { dispatch: () => d() };

let middlewares = [mwA, mwB, mwC];

let dispatch = middlewares.map((mw) => mw(api));

console.log("first dispatch section", dispatch);

dispatch = dispatch.reduceRight((next, mw) => mw(next), reducer);

console.log("second dispatch section", dispatch);

dispatch("TEST_ACTION");
