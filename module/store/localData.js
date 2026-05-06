export const localData = {
  loadData() {
    let temp = localStorage.getItem("rows");
    console.log("loadData in localData", JSON.parse(temp));
    return temp ? JSON.parse(temp) : initialState;
  },
  resetData() {
    localStorage.removeItem("rows");
    return initialState;
  },
};
