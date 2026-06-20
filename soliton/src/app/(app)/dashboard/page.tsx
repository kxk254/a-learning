export default function dashboard() {
  function double(n: number): number {
    console.log(n * 2);
    return n * 2;
  }

  const x = double(5);

  let a = "a";
  let parsed = "parsed";
  return (
    <>
      {" "}
      <div>{x}</div>
      <div>{parsed}</div>
    </>
  );
}
