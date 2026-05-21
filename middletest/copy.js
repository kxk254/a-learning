const board = document.querySelector("#board");
let mws = [mwA, mwB];
let text;
let actionb;
function mwA(next) {
  return function (action) {
    console.log("A before");
    actionb += action + "bef A ";
    let result = next(action);
    actionb += action + "A ";
    console.log("A after");
    return actionb;
  };
}
function mwB(next) {
  return function (action) {
    console.log("B before");
    actionb += action + "bef B ";
    let result = next(action);
    actionb += action + "B ";
    console.log("B after");
    return actionb;
  };
}

function reducer(action) {
  console.log("Reducer");
  actionb += "reducer " + action;
  return actionb;
}

const mw = mws.reduceRight((next, mw) => mw(next), reducer);

const chain = mw; //mwA(mwB(reducer));

// chain(mwA);

const result = chain("TEST_ACTION");

board.textContent = result;
