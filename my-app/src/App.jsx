import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <div>
              <h1>Tere</h1>
              <p>See on avaleht.</p>
            </div>
          }
        />

        <Route
          path="/raamistik"
          element={
            <div>
              <h1>Meie raamistik666</h1>
              <p>See on teine lehekülg.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
