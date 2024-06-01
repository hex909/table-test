// import { Column } from "@tanstack/react-table";
// import { IListProductServer } from "../definitions/api";

function Search({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
    />
  );
}

export default Search;
