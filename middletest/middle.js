function middleware(next) {
  return function (action) {
    console.log("Middleware running");
    return next(action);
  };
}

function reducer(action) {
  console.log("reducer got:", action);
  return `Handled ${action}`;
}

const chain = middleware(reducer);

const result = chain("TEST_ACTION");

const board = document.querySelector("#board");

board.textContent = result;
