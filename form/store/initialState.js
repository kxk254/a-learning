export const initialState = {
  past: [],
  present: {
    entities: { rows: [] },
    user: null,
    ui: { loading: false, error: null, searchTerm: "", sortBy: "none" },
  },
  future: [],
};
