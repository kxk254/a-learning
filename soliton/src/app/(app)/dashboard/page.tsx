export default function dashboard() {
  function printCoord(pt: { x: number; y: number }) {
    return pt.x;
  }

  let a = printCoord({ x: 3, y: 7 });

  return (
    <>
      {" "}
      <div>{a}</div>
    </>
  );
}
