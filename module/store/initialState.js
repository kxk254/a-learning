export function initialState() {
  return {
    past: [],
    present: { user: null, entities: { rows: [] } },
    future: [],
  };
}
