import Table from "./components/Table";
import { useGetProducts } from "./lib/action";

function App() {
  const { data } = useGetProducts();

  return (
    <main className="py-6 ">
      {data ? (
        <Table data={data} />
      ) : (
        <div className="min-h-svh grid place-items-center">
          <span className="loading loading-ring loading-md"></span>
        </div>
      )}
    </main>
  );
}

export default App;
