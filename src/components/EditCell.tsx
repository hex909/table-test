import { CellContext } from "@tanstack/react-table";
import { IListProductServer } from "../definitions/api";
import { MouseEvent } from "react";

function EditCell({ row, table }: CellContext<IListProductServer, unknown>) {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    const name = e.target.name;

    if (name === "done") {
      meta?.saveData(row.original);
    } else if (name === "cancel") {
      meta?.revertData(row.index);
    }
  };

  return meta?.editedRows[row.id] ? (
    <div className="flex gap-1 items-center ">
      <button
        className="btn btn-circle btn-error btn-sm"
        onClick={setEditedRows}
        name="cancel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>{" "}
      <button
        className="btn btn-circle btn-sm btn-success"
        onClick={setEditedRows}
        name="done"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
    </div>
  ) : (
    <button
      onClick={setEditedRows}
      name="edit"
      className="btn btn-circle btn-sm btn-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </button>
  );
}

export default EditCell;
