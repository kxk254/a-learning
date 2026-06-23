type RowMeta = {
  isDirty: boolean;
  isExpanded?: boolean;
};

type TableSub<T> = {
  id: string;
  level: 1;
  data: T;
  meta: { isDirty: true };
};

type TableNode<T> = {
  id: string;
  level: number;
  data: T;
  meta: RowMeta;
  children?: TableSub<T>[];
};

type Tenant = { id: string; name: string; amount: number };

const rows: TableNode<T extends {id:string}>(rows:T[]):T[] = [
  {
    id: "tenant-1",
    level: 0,
    data: { id: "t1", name: "Bob", amount: 2 },
    meta: { isDirty: false, isExpanded: true },
    children: [
      {
        id: "invoice-1",
        level: 1,
        data: { id: "i1", product: "Laptop", amount: 1000 },
        meta: { isDirty: true },
      },
    ],
  },
];

export default function Flatten<T>(nodes: TableNode<T>[]): TableNode<T>[] {
  return nodes.flatMap((node) => [
    node,
    ...(node.children ? Flatten(node.children) : []),
  ]);
}
