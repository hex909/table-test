import { CellContext } from "@tanstack/react-table";
import { IListProductServer } from "../definitions/api";
import { useEffect, useState } from "react";

function TableCell({
  getValue,
  row,
  column,
  table,
}: CellContext<IListProductServer, string>) {
  const initialValue = getValue();
  const [value, setValue] = useState("");
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  //     table.options.meta?.updateData(row.index, column.id, value);

  if (tableMeta?.editedRows[row.id]) {
    return (
      <input
        className="w-10 inline-block h4 bg-transparent mx-auto text-center"
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          table.options.meta?.updateData(row.index, column.id, value);
          setValue(value);
        }}
        type="number"
      />
    );
  }
  return <span>{value}</span>;
}

export default TableCell;
