export default function Dashboard() {
  class GenericNumber<NumType> {
    zeroValue!: NumType;
    add!: (x: NumType, y: NumType) => NumType;
  }

  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };

  let a = myGenericNumber.add(23, 55);
  console.log(a);
}
