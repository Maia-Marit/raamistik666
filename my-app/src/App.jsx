import { useState } from "react";
import Meist from "./pages/Meist.jsx";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Tere</button>
        <button onClick={() => setPage("second")}>Teine leht</button>
      </nav>

      {page === "home" ? (
        <>
          <h1>Tere/raamistik 666</h1>
          <p>See on meie esimene Reacti rakendus.</p>
        </>
      ) : (
        <Meist />
      )}
    </>
  );
}

export default App;

