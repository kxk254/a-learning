function test(name, fn) {
  try {
    fn();
    console.log("PASSED", name);
  } catch (err) {
    console.log("ERROR :", err.message);
  }
}

function expect(received) {
  return {
    toBe(expected) {
      if (received !== expected) {
        throw new Error(`Expected ${expected}, got ${received}`);
      }
    },

    toEqual(expected) {
      const r = JSON.stringify(received);
      const e = JSON.stringify(expected);

      if (r !== e) {
        throw new Error(`expected ${e}, got ${r}`);
      }
    },
  };
}

test("increments counter", () => {
  const result = counterReducer(0, { type: "inc" });

  expect(result).toBe(1);
});

test("dispatch updates state", () => {
  app.dispatch({ type: "addRow" });

  expect(getState()).toBe(1);
});

test("listener gets called", () => {
  let called = false;
  const unsub = app.subscribe(() => {
    called = true;
  });

  app.dispatch({ type: "addRow" });

  expect(called).toBe(true);

  unsub();
});

test("thunk dispatches actions", async () => {
  const actions = [];
  const dispatch = (action) => {
    actions.push(action);
  };

  const getState = () => ({});
  const thunk = async (dispatch) => {
    dispatch({ type: "start" });
    dispatch({ type: "success" });
  };
  await thunk(dispatch, getState);
  expect(actions).toEqual([{ type: "start" }, { type: "success" }]);
});
