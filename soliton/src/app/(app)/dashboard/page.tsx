export default function dashboard() {
  interface Options {
    width: number;
  }

  function configure(x: Options | "auto") {
    console.log("configure  ", x);
    return x;
  }

  let a = configure({ width: 100 });
  configure("auto");
  configure("automatic");

  a = String(a.width);

  function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output,
  ): Output[] {
    return arr.map(func);
  }

  const parsed = map(["1", "2", "3", 4, 5], (n) => parseInt(n));

  return (
    <>
      {" "}
      <div>{a}</div>
      <div>{parsed}</div>
    </>
  );
}
