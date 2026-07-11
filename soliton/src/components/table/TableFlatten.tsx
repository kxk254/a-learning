"use client";
import React, { useState, ReactNode, Fragment, useEffect } from "react";

// onCellUpdate,getRowKey
// resolveRowKey, editingCell, editValue,editedCells,getCellKey

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;

  editor?: {
    type: "text" | "select" | "number";
    options?: { value: string | number; label: string }[];
    optionsUrl?: string;
  };
};

export type CellUpdate<T> = { row: React.Key; key: keyof T; value: string };

export type TableProp<T> = {
  columns: Column<T>[];
  data: T[];
  renderRow?: (row: T) => ReactNode;
  onCellUpdate?: (update: CellUpdate<T>) => void;
  getRowKey: (row: T) => React.Key;
  onDelete?: (row: React.Key) => void;
  onAdd?: (newRow: Partial<T>) => void;
};

export default function TableFlatten<T>({
  columns,
  data,
  renderRow,
  onCellUpdate,
  getRowKey,
  onDelete,
  onAdd,
}: TableProp<T>) {
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState<Partial<T>>({});
  const [expanded, setExpanded] = useState<Set<React.Key>>(new Set());
  const [editingCell, setEditingCell] = useState<{
    row: React.Key;
    key: keyof T;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editedCells, setEditedCells] = useState<Record<string, boolean>>({});
  const getCellKey = (rowKey: React.Key, key: keyof T) =>
    `${String(rowKey)}-${String(key)}`;

  const toggleRow = (id: React.Key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const rowKey = getRowKey(row);
          return (
            <Fragment key={rowKey}>
              <tr>
                <td>
                  <button onClick={() => toggleRow(Number(rowKey))}>
                    {expanded.has(rowKey) ? "=" : "+"}
                  </button>
                </td>
                {columns.map((col) => {
                  const isEdit =
                    editedCells[getCellKey(rowKey, col.key)] ?? false;
                  return (
                    <td
                      key={String(col.key)}
                      onClick={() => {
                        setEditingCell({ row: rowKey, key: col.key });
                        setEditValue(String(row[col.key]) ?? "");
                      }}
                    >
                      {editingCell?.row === rowKey &&
                      editingCell?.key === col.key ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                            if (e.key === "Escape") {
                              setEditingCell(null);
                            }
                          }}
                          onBlur={() => {
                            const original = String(row[col.key]) ?? "";
                            if (original !== editValue) {
                              setEditedCells((prev) => ({
                                ...prev,
                                [getCellKey(rowKey, col.key)]: true,
                              }));
                              onCellUpdate?.({
                                row: rowKey,
                                key: col.key,
                                value: editValue,
                              });
                            }
                            setEditingCell(null);
                          }}
                        />
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        String(row[col.key])
                      )}
                    </td>
                  );
                })}
                <td>
                  <button
                    onClick={() => {
                      onDelete?.(rowKey);
                    }}
                  >
                    DEL
                  </button>
                </td>
              </tr>
              {expanded.has(rowKey) && (
                <tr>
                  <td colSpan={columns.length + 2}>{renderRow?.(row)}</td>
                </tr>
              )}
            </Fragment>
          );
        })}
        {adding && (
          <tr>
            {columns.map((col) => (
              <td key={String(col.key)}>
                <input
                  autoFocus
                  value={String(newRow[col.key] ?? "")}
                  onChange={(e) =>
                    setNewRow((prev) => ({
                      ...prev,
                      [col.key]: e.target.value,
                    }))
                  }
                />
              </td>
            ))}
            <td>
              <button
                onClick={() => {
                  onAdd?.(newRow);
                  setNewRow({});
                  setAdding(false);
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setNewRow({});
                  setAdding(false);
                }}
              >
                Cancell
              </button>
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={columns.length + 2}>
            <button onClick={() => setAdding(true)}>+</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export function FlattenTable<T>({
  columns,
  data,
  renderRow,
  onCellUpdate,
  getRowKey,
  onDelete,
  onAdd,
}: TableProp<T>) {
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState<Partial<T>>({});
  const [editingCell, setEditingCell] = useState<{
    row: React.Key;
    key: keyof T;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editedCells, setEditedCells] = useState<Record<string, boolean>>({});
  const getCellKey = (rowKey: React.Key, key: keyof T) =>
    `${String(rowKey)}=${String(key)}`;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{String(col.label)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => {
          const rowKey = getRowKey(r);
          return (
            <tr key={rowKey}>
              {columns.map((col) => {
                const isEdit =
                  editedCells[getCellKey(rowKey, col.key)] ?? false;
                return (
                  <td
                    key={String(col.key)}
                    onClick={() => {
                      setEditingCell({ row: rowKey, key: col.key });
                      setEditValue(String(r[col.key]) ?? "");
                    }}
                  >
                    {editingCell?.row === rowKey &&
                    editingCell?.key === col.key ? (
                      <CellEditor
                        column={col}
                        value={editValue}
                        onChange={setEditValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                          }
                          if (e.key === "Escape") {
                            setEditingCell(null);
                          }
                        }}
                        onBlur={() => {
                          const original = String(r[col.key]) ?? "";
                          if (original !== editValue) {
                            setEditedCells((prev) => ({
                              ...prev,
                              [getCellKey(rowKey, col.key)]: true,
                            }));
                            onCellUpdate?.({
                              row: rowKey,
                              key: col.key,
                              value: editValue,
                            });
                          }
                          setEditingCell(null);
                        }}
                      />
                    ) : (
                      String(r[col.key])
                    )}
                  </td>
                );
              })}
              <td>
                <button
                  onClick={() => {
                    onDelete?.(rowKey);
                  }}
                >
                  DEL
                </button>
              </td>
            </tr>
          );
        })}
        {adding && (
          <AddingRow columns={columns} onCancel={() => setAdding(false)} />
        )}
        <tr>
          <td colSpan={columns.length + 2}>
            <button onClick={() => setAdding(true)}>+</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function CellEditor<T>({
  column,
  value,
  onChange,
  onBlur,
  onKeyDown,
}: {
  column: Column<T>;
  value: string;
  onChange: (value: string) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement>;
}) {
  const editor = column.editor;

  if (editor?.type === "select") {
    return (
      <select
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        {editor.options?.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  if (editor?.type === "number") {
    return (
      <input
        autoFocus
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    );
  }
  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}

function AddingRow<T>({
  columns,
  onAdd,
  onCancel,
}: {
  columns: Column<T>[];
  onAdd?: (newRow: Partial<T>) => void;
  onCancel: () => void;
}) {
  const [newRow, setNewRow] = useState<Partial<T>>({});
  console.log("new row", newRow);
  return (
    <tr>
      {columns.map((col) => (
        <td key={String(col.key)}>
          <input
            autoFocus
            value={String(newRow[col.key] ?? "")}
            onChange={(e) =>
              setNewRow((prev) => ({ ...prev, [col.key]: e.target.value }))
            }
          />
        </td>
      ))}
      <td>
        <button
          onClick={() => {
            onAdd?.(newRow);
            setNewRow({});
            onCancel();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setNewRow({});
            onCancel();
          }}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
