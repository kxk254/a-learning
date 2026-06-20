export default function dashboard() {
  function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number,
  ): number {
    if (obj.length >= minimum) {
      return obj.length;
    } else {
      return 2;
    }
  }
}
